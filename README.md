# ⚖️ AI Judge - Legal Case Analysis Platform

A production-quality web application that uses Google Gemini AI to analyze legal cases, generate verdicts, and facilitate structured argumentation between opposing parties. Built with Flask backend and a premium legal-tech UI.

![AI Judge](https://img.shields.io/badge/AI-Judge-6A4CE8?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask)
![Gemini](https://img.shields.io/badge/Gemini-Pro-4285F4?style=for-the-badge&logo=google)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [UI/UX Design](#uiux-design)
- [Tech Stack](#tech-stack)
- [Setup Guide](#setup-guide)
- [API Documentation](#api-documentation)
- [Caching Strategy](#caching-strategy)
- [Scaling Plan](#scaling-plan)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

## 🎯 Overview

AI Judge is an intelligent legal case analysis platform that:

- **Analyzes legal documents** from opposing parties using Google Gemini Pro AI
- **Generates impartial verdicts** with confidence scores and bias detection
- **Facilitates structured argumentation** with up to 5 rounds of follow-up arguments
- **Tracks verdict evolution** through an animated timeline
- **Provides legal precedents** and document comparison analysis
- **Supports multi-language** (English & Hindi)
- **Exports final judgments** as professional PDF documents

## ✨ Features

### Core Functionality

- ✅ **Document Upload**: Support for PDF, DOCX, DOC, and TXT files
- ✅ **AI-Powered Analysis**: Initial verdict generation with comprehensive legal reasoning
- ✅ **Argument Rounds**: Up to 5 rounds of structured arguments from both sides
- ✅ **Three-Panel Layout**: Clean separation of Lawyer A, AI Judge, and Lawyer B

### Advanced Features

1. **📅 Verdict Evolution Timeline**
   - Visual timeline showing how verdicts change across rounds
   - Animated cards with round numbers, verdict previews, and confidence scores
   - Tracks all argument submissions and their impact

2. **🎯 Bias Detection**
   - AI analyzes verdict neutrality
   - Color-coded badges: Green (Neutral), Yellow (Slight Lean), Red (Strong Lean)
   - Detailed bias explanation

3. **📊 Confidence Meter**
   - Animated horizontal bar showing AI confidence (0-100%)
   - Real-time updates as arguments are processed
   - Visual feedback with gradient colors

4. **📚 Legal Precedent Finder**
   - AI identifies 2+ relevant legal precedents
   - Expandable cards with case names, summaries, and relevance
   - Continuously updated as new arguments are submitted

5. **📊 Document Comparison Table**
   - Automatic comparison of Side A vs Side B documents
   - Highlights agreements, contradictions, and strengths
   - Color-coded for easy identification

6. **💬 Argument Quality Scoring**
   - Rates each argument on:
     - Clarity (1-10)
     - Evidence Support (1-10)
     - Overall Strength (Weak/Medium/Strong)
   - Visual score bars and badges

7. **📋 Case Summary Auto-Generator**
   - Automatic extraction of:
     - Case facts
     - Legal issues
     - Parties involved
     - Relief sought

8. **📄 PDF Export**
   - Professional PDF generation of final verdict
   - Includes all analysis components
   - Downloadable with one click

9. **🌐 Multi-Language Support**
   - English and Hindi (हिंदी)
   - Toggle between languages
   - AI translates verdicts and summaries

10. **🎨 Premium UI/UX**
    - Glassmorphism design with neon glows
    - Smooth animations and transitions
    - Responsive mobile design
    - Legal-tech color scheme

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐
│   Frontend      │
│  (HTML/CSS/JS)  │
└────────┬────────┘
         │ HTTP/REST
┌────────▼────────┐
│   Flask API     │
│   (main.py)     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼──────┐
│ Cache │ │ Gemini  │
│ Layer │ │   API   │
└───────┘ └─────────┘
```

### Project Structure

```
AI-Judge/
├── main.py                 # Flask application entry point
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── README.md              # This file
│
├── utils/
│   └── file_parser.py     # Document parsing utilities (PDF, DOCX, TXT)
│
├── services/
│   └── ai_judge.py        # AI Judge service (Gemini integration)
│
├── templates/
│   └── index.html         # Main application template
│
└── static/
    ├── style.css          # Premium styling
    └── script.js          # Frontend logic
```

### Data Flow

1. **Document Upload**: Files → Parser → Text Extraction → Cache → Storage
2. **Verdict Generation**: Documents → Gemini API → Analysis → Response Parsing → UI Display
3. **Argument Processing**: Arguments → Gemini API → Updated Analysis → Timeline Update
4. **PDF Export**: Verdict Data → ReportLab → PDF Generation → Download

## 🎨 UI/UX Design

### Design Philosophy

The UI follows a **premium legal-tech aesthetic** with:

- **Dark Theme**: Deep navy background (#0B0F1A) for reduced eye strain
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Neon Accents**: Purple (#6A4CE8) and gold (#EABE3F) for legal authority
- **Smooth Animations**: Fade-ins, slide-ins, and pulse effects
- **Responsive Layout**: Mobile-first design with breakpoints

### Color Palette

- **Background Primary**: `#0B0F1A` (Deep Navy)
- **Background Secondary**: `#14213D` (Legal Navy)
- **Accent Purple**: `#6A4CE8` (Primary Actions)
- **Accent Gold**: `#EABE3F` (Highlights, Justice)
- **Text Primary**: `#F5F5F7` (High Contrast)
- **Text Secondary**: `#B8B8C0` (Subtle Text)

### Layout

- **Three-Column Grid**: Lawyer A | AI Judge | Lawyer B
- **Bottom Section**: Timeline + Precedents
- **Sticky Header**: Language toggle + PDF download
- **Responsive**: Stacks vertically on mobile

## 🛠️ Tech Stack

### Backend

- **Python 3.10+**: Core language
- **Flask 3.0.0**: Web framework
- **Flask-CORS 4.0.0**: Cross-origin resource sharing
- **python-dotenv 1.0.0**: Environment variable management
- **google-generativeai 0.3.2**: Gemini Pro API client
- **PyMuPDF 1.23.8**: PDF parsing
- **python-docx 1.1.0**: DOCX parsing
- **reportlab 4.0.7**: PDF generation

### Frontend

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **Vanilla JavaScript**: No framework dependencies
- **Responsive Design**: Mobile-first approach

## 🚀 Setup Guide

### Prerequisites

- Python 3.10 or higher
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- pip (Python package manager)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd AI-Judge
```

2. **Create virtual environment** (recommended)

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Set up environment variables**

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5000
```

5. **Create uploads directory**

```bash
mkdir uploads
```

6. **Run the application**

```bash
python main.py
```

The application will be available at `http://localhost:5000`

### Quick Start

1. Open `http://localhost:5000` in your browser
2. Upload documents from both Lawyer A and Lawyer B
3. Click "Analyze Case" to generate initial verdict
4. Submit arguments (up to 5 rounds)
5. View timeline evolution and download PDF verdict

## 📡 API Documentation

### Endpoints

#### `POST /upload_documents`

Upload documents from both sides.

**Request:**
- `side_a_file`: File (PDF, DOCX, DOC, TXT)
- `side_b_file`: File (PDF, DOCX, DOC, TXT)
- `language`: String ("en" or "hi")

**Response:**
```json
{
  "case_id": "uuid-string",
  "message": "Documents uploaded successfully",
  "side_a_length": 1234,
  "side_b_length": 5678
}
```

#### `POST /get_verdict`

Generate initial verdict for a case.

**Request:**
```json
{
  "case_id": "uuid-string"
}
```

**Response:**
```json
{
  "verdict": {
    "case_summary": "...",
    "legal_reasoning": "...",
    "final_verdict": "...",
    "confidence_score": 85,
    "bias_analysis": {...},
    "precedents": [...],
    "document_comparison": {...}
  },
  "timeline": [...]
}
```

#### `POST /argue`

Process a new round of arguments.

**Request:**
```json
{
  "case_id": "uuid-string",
  "arg_a": "Argument from Lawyer A",
  "arg_b": "Argument from Lawyer B"
}
```

**Response:**
```json
{
  "verdict": {...},
  "timeline": [...],
  "arguments_left": 4
}
```

#### `GET /get_timeline`

Get verdict timeline for a case.

**Query Parameters:**
- `case_id`: UUID string

**Response:**
```json
{
  "timeline": [...],
  "arguments_left": 3
}
```

#### `GET /download_pdf`

Download final verdict as PDF.

**Query Parameters:**
- `case_id`: UUID string

**Response:** PDF file download

#### `POST /set_language`

Set language preference.

**Request:**
```json
{
  "case_id": "uuid-string",
  "language": "en" | "hi"
}
```

#### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "AI Judge"
}
```

## 💾 Caching Strategy

### Current Implementation

- **Document Cache**: Parsed document text cached by filename + size
- **In-Memory Storage**: Cases stored in memory (Python dictionary)
- **Simple LRU**: Basic cache for frequently accessed documents

### Cache Layers

1. **Document Parsing Cache**
   - Key: `filename_filesize`
   - Value: Extracted text
   - Purpose: Avoid re-parsing identical files

2. **Case Storage**
   - In-memory dictionary
   - Key: `case_id` (UUID)
   - Value: Complete case data

### Future Enhancements

- **Redis Integration**: Distributed caching for multi-instance deployments
- **Response Caching**: Cache Gemini API responses for similar cases
- **File Storage**: Move to cloud storage (S3, GCS) for document persistence

## 📈 Scaling Plan

### Horizontal Scaling

#### 1. **Kubernetes Deployment**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-judge
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: flask-app
        image: ai-judge:latest
        ports:
        - containerPort: 5000
```

**Benefits:**
- Auto-scaling based on CPU/memory
- Zero-downtime deployments
- Load distribution

#### 2. **Redis Cache Layer**

```python
import redis
redis_client = redis.Redis(host='redis-cluster', port=6379)

# Cache document parsing
cache_key = f"doc:{filename}:{filesize}"
cached_text = redis_client.get(cache_key)
```

**Benefits:**
- Shared cache across instances
- Fast lookups
- TTL-based expiration

#### 3. **Background Processing**

Use Celery for async tasks:

```python
from celery import Celery

celery_app = Celery('ai_judge')

@celery_app.task
def generate_verdict_async(case_id):
    # Long-running Gemini API calls
    pass
```

**Benefits:**
- Non-blocking API responses
- Better user experience
- Queue management

#### 4. **Secrets Manager**

- **AWS Secrets Manager** or **Google Secret Manager**
- Store API keys securely
- Rotate credentials automatically

#### 5. **Global Load Balancing**

- **Cloudflare** or **AWS ALB**
- Geographic distribution
- DDoS protection
- SSL termination

### Database Migration

Replace in-memory storage with:

- **PostgreSQL**: For case data persistence
- **MongoDB**: For flexible document storage
- **S3/GCS**: For file storage

### Monitoring & Observability

- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **ELK Stack**: Log aggregation
- **Sentry**: Error tracking

## 🚢 Deployment

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "main.py"]
```

Build and run:

```bash
docker build -t ai-judge .
docker run -p 5000:5000 --env-file .env ai-judge
```

### Cloud Platforms

#### Heroku

```bash
heroku create ai-judge-app
heroku config:set GEMINI_API_KEY=your_key
git push heroku main
```

#### AWS Elastic Beanstalk

```bash
eb init -p python-3.10 ai-judge
eb create ai-judge-env
eb deploy
```

#### Google Cloud Run

```bash
gcloud run deploy ai-judge \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars GEMINI_API_KEY=your_key
```

### Environment Variables

Required:
- `GEMINI_API_KEY`: Your Google Gemini API key

Optional:
- `FLASK_ENV`: `development` or `production`
- `FLASK_DEBUG`: `True` or `False`
- `PORT`: Server port (default: 5000)

## 📸 Screenshots

### Main Interface
*Three-column layout with document uploads and AI Judge panel*

### Verdict Display
*Comprehensive verdict with confidence meter, bias analysis, and legal reasoning*

### Timeline View
*Animated timeline showing verdict evolution across argument rounds*

### Precedents & Comparison
*Expandable precedent cards and document comparison table*

## 🎥 Demo Video

*[Placeholder for demo video link]*

## 🔒 Security Considerations

- **API Key Protection**: Never commit `.env` files
- **File Upload Validation**: Strict file type and size limits
- **Input Sanitization**: All user inputs validated
- **CORS Configuration**: Restricted to trusted origins
- **Rate Limiting**: Implement to prevent abuse

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini Pro API for AI capabilities
- Flask community for excellent documentation
- Legal tech community for inspiration

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ⚖️ for the legal community**

