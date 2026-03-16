# ⚙ Cerevo Backend – Career Recommendation Engine

This repository contains the **backend implementation** of the Cerevo Career Guidance System.

The backend processes user inputs, generates career recommendations, manages authentication, and produces career roadmap reports.

---

# 🛠 Technologies Used

| Technology | Purpose |
|-----------|--------|
| Python | Backend language |
| FastAPI | API framework |
| Uvicorn | ASGI server |
| Pandas | Data processing |
| NumPy | Numerical operations |
| JWT | Authentication |
| ReportLab | PDF generation |

---

# ⭐ Backend Features

- AI-based career recommendation engine
- Interest-to-career mapping
- JWT-based authentication
- Career roadmap generation
- PDF career report generation
- RESTful API endpoints

---

# 📂 Project Structure

```
backend

├── assets
├── data
├── ml
├── roadmaps
├── routes
│
├── main.py
├── recommender.py
├── interest_mapper.py
├── models.py
├── schemas.py
├── dependencies.py
├── security.py
├── pdf_generator.py
├── requirements.txt
└── README.md
```

---

# ⚙ Installation

Navigate to backend directory:


cd backend


Install dependencies:


pip install -r requirements.txt


---

# 🚀 Run Backend Server


uvicorn main:app --reload


Server will run at:


http://127.0.0.1:8000


API documentation:


http://127.0.0.1:8000/docs


---

# 📌 Backend Responsibilities

- Process user interests
- Generate career recommendations
- Provide career roadmap data
- Handle authentication
- Generate PDF reports

---


