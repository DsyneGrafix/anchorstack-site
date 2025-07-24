import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FocusTimer from '@/components/FocusTimer';
import QuickNotes from '@/components/QuickNotes';
const Dashboard = () => {
    return (_jsxs("div", { style: { padding: '2rem' }, children: [_jsx("h2", { children: "\uD83C\uDFAF AnchorStack Dashboard" }), _jsx(FocusTimer, {}), _jsx(QuickNotes, {})] }));
};
export default Dashboard;
