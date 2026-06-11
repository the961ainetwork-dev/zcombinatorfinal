# 961 Combinator (xyz) & Z961combinator Initiative
> **Institutional Sandbox & Transnational Platform for Lebanese Tech Stabilisation**
>
> Aligned with UNDP Lebanon Country Programme (2023–2026), ESCWA Economic Recovery, and BDL circular structures.

---

## 🛠️ Project Core Vision

**961 Combinator** is a dual-core platform designed to revive, stabilize, and scale Lebanese entrepreneurial value under complex macroeconomic constraints:
1. **The Public Hub (`961 Combinator`)**: Providing real-time tech journalism, startup directories, an active Lebanese jobs board, and an interactive AI **Pitch Lab** to assist local solopreneurs.
2. **The Transnational Sandbox (`Z961combinator Initiative`)**: An institutional-grade, RAG-driven matching gateway designed to connect highly-vetted Lebanese tech builders directly with the country's extensive global diaspora network.

By bypassing friction in the local cash-economy and introducing structured verification metrics, the platform serves as **Digital Infrastructure for Economic Stabilization**—promoting green recovery, decentralized governance, and secure cross-border venture capital integration.

---

## 🛡️ NCEI Institutional Roadmap

For sovereign credibility and to give diaspora investors high confidence, the system utilizes a **"Vetting-First"** architecture orchestrated by the **National Center for Enterprise and Innovation (NCEI)**.

```
       [ Lebanese Founder ]
                │  (Fills Readiness Profile)
                ▼
  [ NCEI Expert Audit Console ]
                │  (Reviews TAM, Team, & Model)
                ▼
     [ Set Readiness Score ] ───▶ [ Verified & Publish-Ready ]
                                                │
                                                ▼
                                   [ RAG Semantic Vector Match ]
                                                │
                                                ▼
                                   [ Diaspora Capital Channels ]
```

### 1. The Readiness Score Key Metrics
Every startup profile defaults to a restricted, un-audited state. NCEI academic experts and researchers manually evaluate profiles based on four core pillars:
*   **Traction Index**: Demonstrated adoption under high currency volatility.
*   **Market Addressability (TAM)**: Practical scalability to GCC, Jordan, or EU markets.
*   **Asset Liquidity Compliance**: Adherence to BDL Circular 165 for Fresh USD settlement routing.
*   **Team Capacity**: Technical mastery and capital efficiency.

### 2. Multi-Role Engagement Channels
The platform implements separate, secure interfaces designed for four distinct sovereign roles:
*   **Startups (Founders)**: Submit readiness matrices, upload feasibility reports to the document vault, and track viewer analytical trails.
*   **Diaspora Investors**: Formulate investment mandates (ticket sizes, sector preferences) and trigger the AI Vector Similarity matches.
*   **Innovation Scouts (University Graduates)**: Access local university-partnered market research reports, identifying green resilience opportunities.
*   **NCEI Administrators**: Human-in-the-loop audit dashboard to endorse startup metrics and sign official validations.

---

## 💻 Tech Stack & Architecture

*   **Frontend**: React 18+ with TypeScript, Vite, Tailwind CSS, and Lucide Icons.
*   **Backend Server**: Full-stack Express integration running over Node.js.
*   **AI Orchestration**: Google Gemini 3.5 Flash via modern API handlers to compute similarity indicators, build match rationales, and power the interactive **Compliance Intermediary** chatbot.
*   **Database Schema (In-Memory Simulation)**:
    *   `users`: Key credential metadata and assigned role parameters (`Startup`, `Investor`, `Scout`, `Admin`).
    *   `entities`: Micro-firmographic records hosting problem/solution matrices, verified flags, and textual vector representations suitable for pgvector indexes.
    *   `investor_mandates`: Regional target indices, ticket constraints, and geographic allocation parameters.
    *   `matching_engine`: Derived matching scores, expert rationale overrides, and live negotiation records.
    *   `sandbox_data_room`: Secure document files utilizing view audit trails.

---

## 🚀 Basic Setup for Developers

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn
*   A Gemini API Key (declared in your environment or active platform workspace)

### Installation & Development

1.  **Clone the repository and install dependencies:**
    ```bash
    npm install
    ```

2.  **Declare Environment Variables:**
    Create a `.env` file in the project root (referencing `.env.example`):
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

3.  **Run Development Server:**
    Utilize the configured Node TSX launcher which spins up both the express server and Vite compiler:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your web browser.

4.  **Local Static Compilation / Production Build:**
    ```bash
    npm run build
    npm run start
    ```

---

## 📋 Security & Compliance Notice

The sandbox code architecture enforces the following security protocols:
*   **Confidentiality Framework**: Feasibility documents, financial models, and pitch decks placed inside the Data Room are inaccessible to general public web crawlers.
*   **Analytical Traceability**: Any file inspect action triggers real-time visual tracking logs within the founder dashboard to prevent unauthorized sharing of intellectual IP.
*   **Local Clearing Integrity**: Payment and equity transfers referenced in milestones correspond strictly with digital fresh-revenue routes to bypass legacy regional restrictions.
