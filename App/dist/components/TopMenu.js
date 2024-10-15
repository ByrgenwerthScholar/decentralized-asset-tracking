"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
function TopMenu() {
    const location = (0, react_router_dom_1.useLocation)();
    const topMenuItems = [
        { text: 'Demo', path: '/demo' },
        { text: 'Blockchain', path: '/blockchain' },
        { text: 'Docs', path: '/docs' },
        { text: 'Contact', path: '/contact' },
    ];
    return (react_1.default.createElement(material_1.AppBar, { position: "fixed", color: "transparent", elevation: 0, sx: {
            height: 80, // Increased height for thickness
            justifyContent: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)', // Separator line
            bgcolor: 'transparent', // Transparent background
        } },
        react_1.default.createElement(material_1.Toolbar, { sx: { height: '100%' } },
            react_1.default.createElement(material_1.Box, { sx: { display: 'flex', alignItems: 'center' } },
                react_1.default.createElement(material_1.Box, { sx: { display: 'flex', alignItems: 'baseline' } },
                    react_1.default.createElement(material_1.Typography, { variant: "h6", sx: {
                            textDecoration: 'none',
                            color: 'text.primary',
                            fontSize: '1.4rem',
                        } }, "LockeLight Demo"))),
            react_1.default.createElement(material_1.Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: 1, // Allows the Box to take up remaining horizontal space
                    marginLeft: '100px', // Static left margin separating from the logo
                    maxWidth: '1000px', // Optional: Limit maximum width to prevent excessive spacing on very large screens
                } }, topMenuItems.map((item, index) => (react_1.default.createElement(react_1.default.Fragment, { key: item.text },
                react_1.default.createElement(material_1.Button, { color: "inherit", component: react_router_dom_1.Link, to: item.path, sx: {
                        color: 'text.primary',
                        borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        flexGrow: 1, // Ensures equal button width
                        paddingY: 1, // Ensures consistent button height
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    } }, item.text),
                index < topMenuItems.length - 1 && (react_1.default.createElement(material_1.Divider, { orientation: "vertical", flexItem: true, sx: {
                        mx: 1, // Horizontal margin around the divider
                        height: '1.5em', // Adjusts the height to align with button text
                        bgcolor: 'rgba(255, 255, 255, 0.3)', // Subtle divider color
                        alignSelf: 'center', // Centers the divider vertically
                    } })))))))));
}
exports.default = TopMenu;
