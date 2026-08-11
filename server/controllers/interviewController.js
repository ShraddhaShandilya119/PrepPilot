const User = require("../models/User");
const { GoogleGenAI } = require("@google/genai");

// Helper function to generate questions with Google Gemini AI or intelligent role fallback
const generateQuestionsWithGemini = async (roleName) => {
  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `
You are a Lead Technical Interviewer and Senior Engineering Manager.
Generate EXACTLY 10 high-quality interview questions and their detailed ideal/reference answers for a candidate applying for the role of "${roleName}".

Include a balanced mix of:
1. Technical questions
2. Conceptual questions
3. Practical / Scenario-based real-world questions

RETURN ONLY VALID JSON (no markdown formatting, no code blocks, no trailing commas).
JSON FORMAT:
{
  "role": "${roleName}",
  "questions": [
    {
      "question": "Clear interview question 1?",
      "answer": "Comprehensive, ideal reference answer explaining key concepts and best practices."
    }
  ]
}
`;

  if (apiKey && apiKey.trim() !== "") {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text || "";
      const cleanedJson = text.replace(/```json/gi, "").replace(/```/g, "").trim();
      const parsedData = JSON.parse(cleanedJson);

      if (parsedData && Array.isArray(parsedData.questions) && parsedData.questions.length > 0) {
        return parsedData.questions.slice(0, 10);
      }
    } catch (geminiError) {
      console.error("Gemini Interview Generation Error:", geminiError.message);
    }
  }

  // Fallback Role-Based Question Bank (When GEMINI_API_KEY is not configured or rate limited)
  return getFallbackQuestionsForRole(roleName);
};

// Comprehensive Fallback Questions Generator based on Target Role
const getFallbackQuestionsForRole = (role) => {
  const roleLower = role.toLowerCase();

  if (roleLower.includes("frontend") || roleLower.includes("react")) {
    return [
      {
        question: "What is the Virtual DOM in React, and how does Reconciliation work?",
        answer: "The Virtual DOM is a lightweight in-memory representation of the real DOM. When component state changes, React creates a new Virtual DOM tree and compares it with the previous tree using the Diffing algorithm. It then efficiently updates only the changed elements in the real DOM (Reconciliation)."
      },
      {
        question: "Explain the difference between SQL and NoSQL databases in web applications.",
        answer: "SQL databases (like PostgreSQL, MySQL) are relational, table-based, and enforce strict ACID properties and fixed schemas. NoSQL databases (like MongoDB) are non-relational, document-oriented, horizontally scalable, and schema-flexible."
      },
      {
        question: "What is the difference between state and props in React?",
        answer: "Props (short for properties) are read-only inputs passed from parent to child components. State is mutable local component data managed internally by the component using hooks like useState."
      },
      {
        question: "Explain CSS Flexbox vs Grid and when to use each.",
        answer: "Flexbox is designed for one-dimensional layouts (either a row or a column). CSS Grid is designed for two-dimensional layouts (both rows and columns simultaneously)."
      },
      {
        question: "How do you optimize the performance of a React application?",
        answer: "Performance optimization in React can be achieved using code splitting with React.lazy/Suspense, memoization using React.memo, useMemo, and useCallback, optimizing image sizes, and avoiding unnecessary re-renders."
      },
      {
        question: "What is Event Delegation in JavaScript and why is it useful?",
        answer: "Event Delegation is a technique of attaching a single event listener to a parent element rather than every child element, leveraging Event Bubbling to handle events triggered by children efficiently."
      },
      {
        question: "Explain the concept of Closures in JavaScript with a practical example.",
        answer: "A Closure is a function bundled together with references to its surrounding state (lexical environment). It gives an inner function access to an outer function's scope even after the outer function has executed."
      },
      {
        question: "Scenario: Your web page is loading slowly on mobile networks. How do you diagnose and fix it?",
        answer: "First, run Lighthouse audit and inspect Network tab waterfalls. Fixes include compressing assets, enabling Gzip/Brotli compression, lazy loading images, splitting JavaScript chunks, and caching assets using Service Workers."
      },
      {
        question: "What are Promises and Async/Await in JavaScript?",
        answer: "Promises represent the eventual completion or failure of an asynchronous operation. Async/Await is syntactic sugar built on top of Promises that allows writing asynchronous code synchronously and cleanly."
      },
      {
        question: "How do CORS (Cross-Origin Resource Sharing) headers work in API requests?",
        answer: "CORS is a browser security mechanism that restricts web pages from making requests to a different domain than the one that served the web page. The server responds with Access-Control-Allow-Origin headers to permit cross-origin access."
      }
    ];
  }

  // Default Full Stack / Software Engineer Fallback Questions
  return [
    {
      question: "What is the difference between REST and GraphQL APIs?",
      answer: "REST uses fixed standard HTTP methods and endpoints returning predetermined data structures, which can lead to over-fetching or under-fetching. GraphQL allows clients to request exact fields needed via a single endpoint using schema queries."
    },
    {
      question: "Explain ACID properties in database management systems.",
      answer: "ACID stands for Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions don't interfere), and Durability (saved data persists despite crashes)."
    },
    {
      question: "How does JWT (JSON Web Token) authentication work?",
      answer: "JWT consists of Header, Payload, and Signature encoded in base64. The server signs the token using a secret key upon login, and the client sends it in the Authorization header (Bearer token) on subsequent requests."
    },
    {
      question: "What is Microservices Architecture vs Monolithic Architecture?",
      answer: "A Monolith is a single unified codebase containing all features. Microservices divide the system into independently deployable, loosely coupled services communicating via APIs or message queues."
    },
    {
      question: "Scenario: A database query is taking 5 seconds to return results. How do you optimize it?",
      answer: "Analyze query execution plan (EXPLAIN), add indexes on frequently queried/joined columns, avoid SELECT *, optimize JOIN conditions, and implement Redis caching for frequent read queries."
    },
    {
      question: "What is the Event Loop in Node.js?",
      answer: "The Event Loop allows Node.js to perform non-blocking I/O operations despite being single-threaded by offloading operations to the system kernel whenever possible."
    },
    {
      question: "Explain Git rebase vs merge.",
      answer: "Git merge creates a new commit combining histories of both branches preserving full context. Git rebase rewrites project history by moving feature branch commits onto the tip of the target branch creating a linear history."
    },
    {
      question: "What are Design Patterns? Explain the Singleton and Factory patterns.",
      answer: "Design Patterns are reusable solutions to common software design problems. Singleton ensures a class has only one instance system-wide. Factory creates objects without specifying the exact class of object created."
    },
    {
      question: "How do you handle error logging and monitoring in production?",
      answer: "Use structured logging (JSON format with request IDs), centralized log aggregators (Elasticsearch/Logstash/Kibana or Datadog), and real-time exception tracking (Sentry)."
    },
    {
      question: "Scenario: Your backend server crashes under high traffic spikes. How do you resolve this?",
      answer: "Implement Horizontal Scaling with Load Balancers, apply Rate Limiting middleware to prevent abuse, introduce Redis Caching for hot data, and use Message Queues (RabbitMQ/Kafka) to decouple heavy processing tasks."
    }
  ];
};

// Controller: Generate Interview Questions using Gemini AI
const generateInterviewQuestions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.targetRole || user.targetRole.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please select a job role first",
      });
    }

    const roleName = user.targetRole.trim();

    // Generate exactly 10 questions using Gemini AI engine
    const questions = await generateQuestionsWithGemini(roleName);

    return res.status(200).json({
      success: true,
      role: roleName,
      questions: questions,
    });
  } catch (error) {
    console.error("Generate Interview Questions Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error generating interview questions.",
    });
  }
};

module.exports = {
  generateInterviewQuestions,
};
