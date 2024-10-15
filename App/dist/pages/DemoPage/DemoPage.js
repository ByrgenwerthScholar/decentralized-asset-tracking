"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/DemoPage.tsx
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const PlayArrow_1 = __importDefault(require("@mui/icons-material/PlayArrow"));
const Stop_1 = __importDefault(require("@mui/icons-material/Stop"));
const react_router_dom_1 = require("react-router-dom");
const select_png_1 = __importDefault(require("../../images/select.png"));
const demos = [
    { id: 'manual', path: '/demo/manual' },
    { id: 'legal', path: '/demo/legal' },
];
function DemoPage() {
    // Define your sidebar control buttons
    const sidebarButtons = [
        { text: 'Start', icon: react_1.default.createElement(PlayArrow_1.default, null), onClick: () => console.log('Start') },
        { text: 'Stop', icon: react_1.default.createElement(Stop_1.default, null), onClick: () => console.log('Stop') },
        // Add more buttons as needed
    ];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { sx: {
                width: '240px', // Use string with units
                bgcolor: 'background.paper',
                height: 'calc(100vh - 80px)', // Full height minus AppBar
                position: 'fixed',
                top: '80px', // Positioned below the AppBar
                left: 0,
                borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
            } },
            react_1.default.createElement(material_1.Box, { sx: { display: 'flex', alignItems: 'center', mb: 2 } },
                react_1.default.createElement(material_1.Typography, { variant: "h6", sx: { color: 'text.primary' } }, "Controls")),
            react_1.default.createElement(material_1.Box, { sx: { display: 'flex', flexDirection: 'column' } }, sidebarButtons.map((button) => (react_1.default.createElement(material_1.Button, { key: button.text, startIcon: button.icon, onClick: button.onClick, sx: {
                    mb: 1,
                    justifyContent: 'flex-start',
                    color: 'text.primary',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                } }, button.text))))),
        react_1.default.createElement(material_1.Box, { component: "main", sx: {
                display: 'flex', // Enable Flexbox
                flexDirection: 'column', // Arrange children vertically
                alignItems: 'center', // Center horizontally
                justifyContent: 'center', // Center vertically
                flexGrow: 1,
                ml: '240px', // Margin left for Sidebar
                mt: '80px', // Margin top for AppBar
                p: 3,
                bgcolor: 'background.default',
                minHeight: '100vh',
            } },
            react_1.default.createElement(material_1.Box, { component: "img", src: select_png_1.default, alt: "Select", sx: {
                    maxWidth: '100%',
                    height: '150px',
                    objectFit: 'contain',
                    marginBottom: '50px',
                } }),
            react_1.default.createElement(material_1.Typography, { variant: "h1", align: "center", gutterBottom: true, sx: { color: '#888888', fontSize: '25px', marginBottom: '20px' } }, "Select Demo Simulation"),
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: '' }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "manual", element: '' }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "automated", element: '<AutomatedDemo />' })))));
}
exports.default = DemoPage;
