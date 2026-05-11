"""
Script de simulation des scénarios MLOps
- Scénario 1: High Traffic
- Scénario 2: API Errors
- Scénario 3: Model Drift
"""
import requests
import time
import random
import threading

API_URL = "http://localhost:8000"

def print_header(title):
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)

# ─────────────────────────────────────────
# SCÉNARIO 1: HIGH TRAFFIC
# ─────────────────────────────────────────
def simulate_high_traffic():
    print_header("SCÉNARIO 1: HIGH TRAFFIC (100 requêtes rapides)")
    success = 0
    errors = 0
    latencies = []

    def send_request():
        nonlocal success, errors
        data = {
            "sepal_length": round(random.uniform(4.5, 7.5), 1),
            "sepal_width": round(random.uniform(2.0, 4.5), 1),
            "petal_length": round(random.uniform(1.0, 6.5), 1),
            "petal_width": round(random.uniform(0.1, 2.5), 1)
        }
        try:
            start = time.time()
            r = requests.post(f"{API_URL}/predict/iris", json=data, timeout=5)
            latency = time.time() - start
            latencies.append(latency)
            if r.status_code == 200:
                success += 1
            else:
                errors += 1
        except Exception as e:
            errors += 1

    threads = []
    for i in range(100):
        t = threading.Thread(target=send_request)
        threads.append(t)
        t.start()
        if i % 10 == 0:
            print(f"  → {i+1}/100 requêtes envoyées...")
        time.sleep(0.05)

    for t in threads:
        t.join()

    avg_latency = sum(latencies) / len(latencies) if latencies else 0
    print(f"\n  ✅ Succès: {success}/100")
    print(f"  ❌ Erreurs: {errors}/100")
    print(f"  ⏱  Latence moyenne: {avg_latency:.3f}s")
    print("\n  → Vérifiez Grafana: api_requests_total et api_request_duration_seconds")

# ─────────────────────────────────────────
# SCÉNARIO 2: API ERRORS
# ─────────────────────────────────────────
def simulate_api_errors():
    print_header("SCÉNARIO 2: API ERRORS (données invalides)")
    errors = 0
    success = 0

    invalid_payloads = [
        {},
        {"sepal_length": "abc", "sepal_width": 3.5, "petal_length": 1.4, "petal_width": 0.2},
        {"sepal_length": 99999, "sepal_width": 99999, "petal_length": 99999, "petal_width": 99999},
        {"sepal_length": -1, "sepal_width": -1, "petal_length": -1, "petal_width": -1},
        {"wrong_field": 5.1},
    ]

    for i in range(30):
        payload = random.choice(invalid_payloads)
        try:
            r = requests.post(f"{API_URL}/predict/iris", json=payload, timeout=5)
            if r.status_code != 200:
                errors += 1
                print(f"  ❌ Erreur {r.status_code}: {payload}")
            else:
                success += 1
        except Exception as e:
            errors += 1
            print(f"  ❌ Exception: {str(e)[:50]}")
        time.sleep(0.2)

    print(f"\n  ❌ Total erreurs générées: {errors}/30")
    print(f"  ✅ Succès inattendus: {success}/30")
    print("\n  → Vérifiez Grafana: api_errors_total")

# ─────────────────────────────────────────
# SCÉNARIO 3: MODEL DRIFT
# ─────────────────────────────────────────
def simulate_model_drift():
    print_header("SCÉNARIO 3: MODEL DRIFT (données hors distribution)")
    low_confidence = 0
    total = 50

    # Données extrêmes hors distribution pour forcer des prédictions incertaines
    drift_samples = [
        {"sepal_length": 10.0, "sepal_width": 0.1, "petal_length": 10.0, "petal_width": 0.1},
        {"sepal_length": 0.1, "sepal_width": 10.0, "petal_length": 0.1, "petal_width": 10.0},
        {"sepal_length": 8.5, "sepal_width": 1.0, "petal_length": 8.0, "petal_width": 3.5},
        {"sepal_length": 3.0, "sepal_width": 5.0, "petal_length": 2.5, "petal_width": 1.8},
        {"sepal_length": 9.0, "sepal_width": 2.0, "petal_length": 7.5, "petal_width": 0.5},
    ]

    for i in range(total):
        data = random.choice(drift_samples)
        try:
            r = requests.post(f"{API_URL}/predict/iris", json=data, timeout=5)
            if r.status_code == 200:
                result = r.json()
                confidence = result.get("confidence", 1.0)
                species = result.get("species", "unknown")
                if confidence < 0.7:
                    low_confidence += 1
                    print(f"  ⚠️  DRIFT: species={species} confidence={confidence:.2f}")
                else:
                    print(f"  ✅ OK: species={species} confidence={confidence:.2f}")
        except Exception as e:
            print(f"  ❌ Erreur: {str(e)[:50]}")
        time.sleep(0.3)

    print(f"\n  ⚠️  Prédictions avec faible confiance: {low_confidence}/{total}")
    print(f"  → Drift détecté: {'OUI' if low_confidence > 5 else 'NON'}")
    print("\n  → Vérifiez Grafana: model_drift_detected et model_prediction_confidence")

# ─────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────
if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("   SIMULATION MLOps - TOUS LES SCÉNARIOS")
    print("=" * 60)
    print("\n  Assurez-vous que l'API tourne sur http://localhost:8000")
    print("  et que Grafana est ouvert sur http://localhost:3001\n")

    input("  Appuyez sur ENTRÉE pour commencer...")

    # Scénario 1
    simulate_high_traffic()
    print("\n  ⏳ Pause 5 secondes avant le scénario suivant...")
    time.sleep(5)

    # Scénario 2
    simulate_api_errors()
    print("\n  ⏳ Pause 5 secondes avant le scénario suivant...")
    time.sleep(5)

    # Scénario 3
    simulate_model_drift()

    print("\n" + "=" * 60)
    print("  ✅ SIMULATION TERMINÉE")
    print("  → Allez sur Grafana pour voir les résultats !")
    print("  → http://localhost:3001")
    print("=" * 60)