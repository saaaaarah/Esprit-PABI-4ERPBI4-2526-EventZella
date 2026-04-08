# EventZella BI Project

## Overview

EventZella is an event management platform developed by Teckcatalyze. It helps users plan and manage events efficiently through intelligent budgeting and service reservation features.

This Business Intelligence (BI) project transforms operational data into actionable insights to support strategic and data-driven decision-making.

---

## Objectives

The main objectives of this project are:

- Enable data-driven decision making  
- Optimize the recommendation algorithm  
- Monitor and improve provider performance  
- Identify market trends  
- Enhance user experience  

---

## Business Problem

EventZella generates large volumes of data related to:

- Beneficiary behavior (preferences, budgets, event types)  
- Provider performance (reservations, ratings, complaints)  
- Market trends  

Currently, this data is underutilized and lacks analytical exploitation.

This project addresses the problem by implementing a complete BI solution.

---

## Existing System Architecture

- **Frontend:** React, React Native, Expo  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Architecture:** MVC (3-tier)  

---

## BI Architecture

### Data Sources

- Reservations  
- Complaints  
- Evaluations  
- Visitors  
- Marketing spending  
- Event budgets  

### ETL Process

- Tool: Talend  
- Data extraction, cleaning, transformation, and loading  

### Data Warehouse

- Relational database (SQL Server, PostgreSQL, or MySQL)  
- Star schema design:
  - Fact tables (Reservations, Budget, Marketing, etc.)
  - Dimension tables (Date, Status, Service, Provider, etc.)

### Visualization

- Tool: Power BI  
- Interactive dashboards and KPI monitoring  

---

## Key Performance Indicators (KPIs)

### Operational KPIs

- Total Reservations  
- Conversion Rate (Visitors to Reservations)  
- Average Spending per Event  
- Cancellation Rate  
- Acceptance Rate  
- Average Response Time  

### Quality KPIs

- Average Provider Rating  
- Net Promoter Score (NPS)  
- Complaints per 100 Reservations  
- Complaint Resolution Rate  

### Business KPIs

- Total Revenue  
- Customer Acquisition Cost (CAC)  
- Lifetime Value (LTV)  
- Beneficiary Retention Rate  
- Provider Retention Rate  

### Product KPIs

- Budget Algorithm Accuracy  
- Suggestion Modification Rate  
- Provider Calendar Fill Rate  
- Service Category Diversity  

---

## Dashboard Features

The Power BI dashboard includes:

- Executive overview (Revenue, Reservations, growth)  
- Customer behavior analysis  
- Provider performance tracking  
- Complaint and satisfaction analysis  
- Time-based analysis (YoY, MoM, YTD)  

---

## Tools and Technologies

| Layer            | Technology |
|------------------|-----------|
| ETL              | Talend |
| Data Warehouse   | Microsoft SQL Server  |
| Visualization    | Power BI |
| Backend (BI API) | Flask or Django |
| Frontend (BI)    | Angular |
| Orchestration    | Apache Airflow |
| Automation       | n8n |



## Project Structure
