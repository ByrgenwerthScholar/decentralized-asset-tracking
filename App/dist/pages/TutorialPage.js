"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/components/TutorialPage.tsx
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
// Define your chapters
const chapters = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'advanced-features', title: 'Advanced Features' },
    // Add more chapters as needed
];
// TutorialContent retrieves chapterId internally
const TutorialContent = () => {
    const { chapterId } = (0, react_router_dom_1.useParams)();
    const contentMap = {
        introduction: 'Welcome to the Introduction of the O.W.L. Demo...',
        'getting-started': 'Getting Started with the O.W.L. Demo...',
        'advanced-features': 'Exploring Advanced Features of the O.W.L. Demo...',
        // Add more content as needed
    };
    const content = contentMap[chapterId !== null && chapterId !== void 0 ? chapterId : 'defaultChapterId'];
    if (!content) {
        return react_1.default.createElement(material_1.Typography, { variant: "h6" }, "Chapter not found.");
    }
    return (react_1.default.createElement(material_1.Typography, { variant: "body1" }, content));
};
// TutorialPage component with sidebar and content area
const TutorialPage = () => {
    return (react_1.default.createElement(material_1.Box, { sx: { display: 'flex', height: '100vh' } },
        react_1.default.createElement(material_1.Box, { sx: {
                width: '240px',
                height: 'calc(100vh - 80px)', // Adjusted for AppBar height
                position: 'fixed',
                top: '80px', // Positioned below the AppBar
                bgcolor: '#2c2c2c',
                p: 2,
                borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            } },
            react_1.default.createElement(material_1.Typography, { variant: "h6", sx: { color: 'white', mb: 2 } }, "Tutorial Chapters"),
            react_1.default.createElement(material_1.List, null, chapters.map((chapter) => (react_1.default.createElement(material_1.ListItem, { key: chapter.id, disablePadding: true },
                react_1.default.createElement(material_1.ListItemButton, { component: react_router_dom_1.Link, to: `/tutorial/${chapter.id}`, sx: { color: 'white' } },
                    react_1.default.createElement(material_1.ListItemText, { primary: chapter.title }))))))),
        react_1.default.createElement(material_1.Box, { sx: { flexGrow: 1, p: 3, mt: '80px', ml: '240px' } },
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(material_1.Typography, { variant: "h5" }, "Select a chapter from the sidebar.") }),
                react_1.default.createElement(react_router_dom_1.Route, { path: ":chapterId", element: react_1.default.createElement(TutorialContent, null) })))));
};
exports.default = TutorialPage;
