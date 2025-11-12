# AccessMenu: AI-Powered Accessible Restaurant Menu System

An intelligent restaurant menu system that enhances accessibility for screen reader users through natural language querying. Built with Django, React, LangChain, and OpenAI's GPT-4o-mini, AccessMenu enables users to interact with restaurant menus using conversational queries instead of traditional visual browsing.

**Research Publication**: [ACM Digital Library](https://doi.org/10.1145/3744257.3744275)

![AccessMenu Interface](Images/Restaurant%20Menu%20Teaser.png)

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [How It Works](#how-it-works)
- [Evaluation Results](#evaluation-results)
- [API Documentation](#api-documentation)
- [Data Structure](#data-structure)
- [Development](#development)
- [Contributing](#contributing)

## Overview

AccessMenu addresses the accessibility challenges faced by screen reader users when browsing restaurant menus. Traditional menu interfaces often present information in complex layouts with visual elements that are difficult to navigate with assistive technologies. AccessMenu transforms this experience by:

- **Natural Language Queries**: Users can ask questions like "Show me vegan options under $15" instead of manually browsing categories
- **Semantic Search**: Powered by vector embeddings and ChromaDB for intelligent menu item retrieval
- **AI-Powered Responses**: GPT-4o-mini processes queries with Chain-of-Thought reasoning to provide accurate, context-aware answers
- **Structured Data Presentation**: Menu items are presented in an organized, screen reader-friendly format
- **Progressive Web App**: Installable on mobile devices with offline capabilities

## System Architecture

The system consists of three main components that work together to provide an accessible menu browsing experience:

![System Architecture](Images/Restaurant%20Menu%20Architecture.png)

### Components

1. **Frontend (React PWA)**
   - Material-UI based responsive interface
   - Natural language query input
   - DataGrid display for menu items
   - Service workers for offline functionality

2. **Backend (Django + LangChain)**
   - RESTful API endpoints
   - LangChain orchestration for AI workflows
   - OpenAI GPT-4o-mini integration
   - Chain-of-Thought prompt engineering

3. **Vector Database (ChromaDB)**
   - Stores menu item embeddings
   - Enables semantic similarity search
   - Maximum Marginal Relevance (MMR) retrieval

### Operational Workflow

1. **Menu Data Loading**: Restaurant menus stored as structured JSON with categories, items, prices, descriptions, and dietary information
2. **Embedding Generation**: Menu data is chunked and converted to vector embeddings using OpenAI's `text-embedding-ada-002`
3. **Vector Storage**: Embeddings stored in ChromaDB with metadata (restaurant name, category, etc.)
4. **User Query Processing**:
   - User enters natural language query
   - Query embedded and matched against menu vectors using MMR
   - Retrieved context fed to GPT-4o-mini with custom prompt
   - Structured JSON response parsed and displayed

## Key Features

### Natural Language Menu Querying

Users can interact with menus using conversational language:

- **Simple Filtering**: "List all vegetarian items"
- **Price-based Queries**: "What are the desserts under $10?"
- **Multi-criteria Search**: "Show me gluten-free appetizers with a drink under $20"
- **Combination Queries**: "Find a vegetarian main dish and dessert combo for less than $30"
- **Recommendations**: "What's a good vegan meal with a drink for under $25?"

### Chain-of-Thought Reasoning

The system employs sophisticated prompt engineering with Chain-of-Thought (CoT) reasoning:

![Chain-of-Thought Prompt](Images/Restaurant%20Menu%20CoT.png)

The CoT prompt includes:
- **Task Description**: Clear definition of the assistant's role
- **Reasoning Steps**: Step-by-step guidance for query processing
- **Few-Shot Examples**: Demonstrations of various query types
- **Guardrails**: Rules to prevent hallucination and ensure accuracy
- **Structured Output**: JSON schema for consistent responses

### Accessibility Features

- **Screen Reader Optimized**: Semantic HTML with ARIA attributes
- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Arrow keys)
- **Clear Information Hierarchy**: Organized presentation of menu data
- **Progressive Web App**: Installable for native-like experience

### Supported Restaurants

Currently includes menu data for:
- **degg**: Breakfast restaurant
- **hocco**: General menu
- **moes**: Mexican cuisine
- **pfchangs**: Asian fusion
- **sushima**: Sushi restaurant
- **udupi**: Indian cuisine

## Technology Stack

### Backend
- **Framework**: Django 4.2.5 with Django REST Framework
- **AI/ML**:
  - LangChain 0.0.294 (orchestration)
  - OpenAI GPT-4o-mini (language model)
  - OpenAI text-embedding-ada-002 (embeddings)
- **Vector Database**: ChromaDB 0.4.15
- **Python**: 3.11.6
- **Text Processing**: tiktoken, RecursiveCharacterTextSplitter

### Frontend
- **Framework**: React 18.2.0
- **UI Library**: Material-UI 5.11
- **State Management**: React Query (@tanstack/react-query), Context API
- **HTTP Client**: Axios 1.3.4
- **Routing**: React Router DOM 6.9.0
- **Form Handling**: React Hook Form 7.43.9 with Yup validation
- **PWA**: Workbox service workers

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: SQLite3 (minimal usage)
- **Reverse Proxy**: ChromaDB HTTP server

## Setup Instructions

### Prerequisites

- Docker and Docker Compose installed
- OpenAI API key
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Hotel Menu"
   ```

2. **Configure environment variables**

   Create a `.env` file in the `backend` directory:
   ```bash
   cd backend
   cat > .env << EOF
   OPENAI_API_KEY=your_openai_api_key_here
   PINECONE_API_KEY=optional_pinecone_key
   PINECONE_API_ENV=optional_pinecone_env
   EOF
   ```

3. **Start the application**
   ```bash
   cd ..
   docker-compose up --build
   ```

   This will start three services:
   - **ChromaDB**: http://localhost:8000
   - **Backend**: http://localhost:8080
   - **Frontend**: http://localhost:3000

4. **Initialize menu data**

   Upload menu data to ChromaDB:
   ```bash
   curl -X POST http://localhost:8080/api/uploadData
   ```

5. **Access the application**

   Open your browser and navigate to: http://localhost:3000

### Individual Restaurant Pages

- http://localhost:3000/degg
- http://localhost:3000/hocco
- http://localhost:3000/moes
- http://localhost:3000/pfchangs
- http://localhost:3000/sushima

## How It Works

### Menu Data Processing

1. **Text Chunking**: Menu JSON is split into chunks using `RecursiveCharacterTextSplitter`
   - Chunk size: 400 tokens
   - Overlap: 30 tokens
   - Separates by category

2. **Embedding Generation**: Each chunk is embedded using OpenAI's ada-002 model

3. **Vector Storage**: Embeddings stored in ChromaDB with metadata:
   ```json
   {
     "hotelName": "degg",
     "chunk": 0,
     "text": "{category content}"
   }
   ```

### Query Processing Pipeline

When a user submits a query:

1. **Query Embedding**: User's query is converted to vector embedding
2. **Semantic Search**: ChromaDB performs MMR (Maximum Marginal Relevance) search to find relevant menu chunks
3. **Context Retrieval**: Top matching chunks retrieved with menu context
4. **LLM Processing**: GPT-4o-mini processes query with custom CoT prompt
5. **Response Generation**: Model returns structured JSON response
6. **UI Rendering**: Frontend parses JSON and displays results in DataGrid

### Chain-of-Thought Prompt Structure

The system uses a carefully crafted prompt that includes:

- **Reasoning Steps**: 7-step process for understanding and responding to queries
- **Few-Shot Examples**: 6 example types demonstrating different query patterns
- **Guardrails**: Rules to prevent hallucination and maintain accuracy
- **Output Schemas**: Three different JSON formats based on query type

## Evaluation Results

The system was evaluated using comprehensive metrics across multiple MLLMs:

![Evaluation Results](Images/Restaurant%20Menu%20Evaluation.png)

### Model Comparison (50 diverse menus)

**GPT-4o-mini** (Selected Model):
- Entity F1 Score: **0.80**
- Relationship F1 Score: **0.73**
- Structural F1 Score: **0.84**

Claude-3.5-Sonnet:
- Entity F1 Score: 0.62
- Relationship F1 Score: 0.43
- Structural F1 Score: 0.79

Llama 3.2-90B-Vision:
- Entity F1 Score: 0.79
- Relationship F1 Score: 0.61
- Structural F1 Score: 0.78

### Query Response Evaluation

- **Dataset**: 5 restaurant menus with 10 volunteers
- **Duration**: 10 minutes per menu (50 minutes total)
- **F1 Score**: **0.83** (high similarity with ground truth)

**Common Error Sources**:
- Difficulty understanding relationships between items placed far apart in menus
- Ambiguous query phrasing (e.g., "healthiest" without defining criteria)
- Complex multi-hop reasoning across distant menu sections

## API Documentation

### Endpoints

#### 1. Get Full Menu
```http
POST /api/getMenu
Content-Type: application/json

{
  "hotel": "degg"
}
```

**Response**: Returns all menu items for the specified restaurant

#### 2. Filter Menu (Natural Language Query)
```http
POST /api/filterData
Content-Type: application/json

{
  "hotel": "degg",
  "data": "Show me vegetarian items under $15"
}
```

**Response**:
```json
{
  "items": [
    {
      "id": "...",
      "name": "Veggie Omelette",
      "price": "$12.5",
      "description": "...",
      "ingredients": ["Eggs", "Peppers", "Onions"],
      "calories": 320
    }
  ]
}
```

#### 3. Upload All Menu Data
```http
POST /api/uploadData
```

Uploads all restaurant menus from `backend/data/` to ChromaDB

#### 4. Upload Single Restaurant
```http
POST /api/uploadToChroma
Content-Type: application/json

{
  "hotel": "degg"
}
```

Uploads a single restaurant's menu to ChromaDB

#### 5. Delete Collections
```http
POST /api/deleteCollections
Content-Type: application/json

{
  "hotelName": "degg"  // or "all" to delete all
}
```

## Data Structure

### Menu JSON Format

Each restaurant has a JSON file in `backend/data/`:

```json
{
  "hotelName": "degg",
  "sections": [
    {
      "id": "unique-section-id",
      "category": "Breakfast Specials",
      "items": [
        {
          "id": "unique-item-id",
          "name": "Early Riser",
          "price": "$7.5",
          "description": "A classic breakfast with eggs, bacon, toast, and hash browns.",
          "ingredients": ["Eggs", "Bacon", "Toast", "Hash Browns"],
          "calories": 350
        }
      ]
    }
  ]
}
```

### Adding New Restaurants

1. Create a new JSON file in `backend/data/` following the structure above
2. Add the restaurant name to the `hotels` array in [backend/api/views.py](backend/api/views.py):
   ```python
   hotels = ['degg', 'hocco', 'moes', 'pfchangs', 'sushima', 'your_restaurant']
   ```
3. Create a new route in [frontend/src/router/index.jsx](frontend/src/router/index.jsx)
4. Upload the menu data using the `/api/uploadToChroma` endpoint

## Development

### Project Structure

```
Hotel Menu/
├── backend/
│   ├── api/                    # Django app
│   │   ├── views.py           # API endpoints & LangChain logic
│   │   ├── urls.py            # API routes
│   │   └── apps.py
│   ├── hmbackend/             # Django project config
│   │   ├── settings.py        # Django settings
│   │   └── urls.py            # Root URL routing
│   ├── data/                  # Restaurant menu JSON files
│   │   ├── degg.json
│   │   ├── hocco.json
│   │   └── ...
│   ├── Dockerfile
│   ├── requirements.txt
│   └── manage.py
├── frontend/
│   ├── public/
│   │   ├── manifest.json      # PWA manifest
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Hotel/         # Main menu query component
│   │   ├── pages/             # Restaurant-specific pages
│   │   ├── router/            # Route configuration
│   │   ├── api/               # Axios setup
│   │   ├── hooks/             # Custom React hooks
│   │   └── App.js
│   ├── Dockerfile
│   └── package.json
├── Images/                    # Documentation images
├── docker-compose.yml
└── README.md
```

### Running in Development Mode

**Backend Only**:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver 8080
```

**Frontend Only**:
```bash
cd frontend
npm install  # or yarn install
npm start    # or yarn start
```

**ChromaDB** (must be running):
```bash
docker run -p 8000:8000 ghcr.io/chroma-core/chroma:0.4.15
```

### Environment Variables

**Backend** (`.env` in `backend/`):
```bash
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=optional
PINECONE_API_ENV=optional
```

**Frontend** (`.env` in `frontend/`):
```bash
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_AUTH0_DOMAIN=optional
REACT_APP_AUTH0_CLIENT_ID=optional
REACT_APP_SQUARE_APP_ID=optional
REACT_APP_SQUARE_LOCATION_ID=optional
```

### Testing

The system includes test file structures but tests need to be implemented:

```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests
cd frontend
npm test
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add feature: description"`
5. Push to your fork: `git push origin feature-name`
6. Submit a pull request

### Areas for Improvement

- Add more restaurant menu data
- Implement user authentication (Auth0 is partially integrated)
- Add payment processing (Square SDK is included but not implemented)
- Expand test coverage
- Implement production-ready security settings
- Add support for menu images with OCR/multimodal extraction
- Internationalization support
- Voice input for queries

## License

This project is part of a research initiative focused on improving accessibility for restaurant menu browsing. Please cite appropriately if used in academic work.

## Acknowledgments

- Built with [LangChain](https://www.langchain.com/) for AI orchestration
- Powered by [OpenAI's GPT-4o-mini](https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/)
- Vector search by [ChromaDB](https://www.trychroma.com/)
- UI components from [Material-UI](https://mui.com/)

## Contact

For questions, issues, or suggestions, please open an issue on the GitHub repository.

---

**Note**: This system uses OpenAI's API which incurs costs. Monitor your usage through the OpenAI dashboard. The system is configured with `temperature=0.0` for consistent, deterministic responses.
