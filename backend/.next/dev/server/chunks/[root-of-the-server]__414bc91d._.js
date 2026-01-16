module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/backend/app/api/hierarchy/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Mock data for demonstration
const mockFaculties = [
    {
        id: '1',
        name: 'Engineering',
        description: 'All engineering disciplines'
    },
    {
        id: '2',
        name: 'Science',
        description: 'Pure and applied sciences'
    },
    {
        id: '3',
        name: 'Commerce',
        description: 'Business and commerce studies'
    },
    {
        id: '4',
        name: 'Arts',
        description: 'Humanities and arts'
    }
];
const mockCourses = [
    // Engineering Courses
    {
        id: 'cs-1',
        name: 'Computer Science',
        code: 'CS',
        description: 'Computer Science and Engineering',
        faculty_id: '1'
    },
    {
        id: 'me-1',
        name: 'Mechanical Engineering',
        code: 'ME',
        description: 'Mechanical Engineering',
        faculty_id: '1'
    },
    {
        id: 'ee-1',
        name: 'Electrical Engineering',
        code: 'EE',
        description: 'Electrical Engineering',
        faculty_id: '1'
    },
    {
        id: 'ce-1',
        name: 'Civil Engineering',
        code: 'CE',
        description: 'Civil Engineering',
        faculty_id: '1'
    },
    // Science Courses
    {
        id: 'phy-1',
        name: 'Physics',
        code: 'PHY',
        description: 'Physics Department',
        faculty_id: '2'
    },
    {
        id: 'chem-1',
        name: 'Chemistry',
        code: 'CHEM',
        description: 'Chemistry Department',
        faculty_id: '2'
    },
    {
        id: 'bio-1',
        name: 'Biology',
        code: 'BIO',
        description: 'Biology Department',
        faculty_id: '2'
    },
    {
        id: 'math-1',
        name: 'Mathematics',
        code: 'MATH',
        description: 'Mathematics Department',
        faculty_id: '2'
    },
    // Commerce Courses
    {
        id: 'bba-1',
        name: 'Business Administration',
        code: 'BBA',
        description: 'Bachelor of Business Administration',
        faculty_id: '3'
    },
    {
        id: 'bcom-1',
        name: 'Commerce',
        code: 'B.COM',
        description: 'Bachelor of Commerce',
        faculty_id: '3'
    },
    {
        id: 'eco-1',
        name: 'Economics',
        code: 'ECO',
        description: 'Economics Department',
        faculty_id: '3'
    },
    {
        id: 'acc-1',
        name: 'Accounting',
        code: 'ACC',
        description: 'Accounting Department',
        faculty_id: '3'
    },
    // Arts Courses
    {
        id: 'eng-1',
        name: 'English Literature',
        code: 'ENG',
        description: 'English Literature Department',
        faculty_id: '4'
    },
    {
        id: 'hist-1',
        name: 'History',
        code: 'HIST',
        description: 'History Department',
        faculty_id: '4'
    },
    {
        id: 'phil-1',
        name: 'Philosophy',
        code: 'PHIL',
        description: 'Philosophy Department',
        faculty_id: '4'
    },
    {
        id: 'psyc-1',
        name: 'Psychology',
        code: 'PSYC',
        description: 'Psychology Department',
        faculty_id: '4'
    }
];
const mockYears = [
    {
        id: 'y1-fall',
        year: 1,
        semester: 'Fall'
    },
    {
        id: 'y1-spring',
        year: 1,
        semester: 'Spring'
    },
    {
        id: 'y2-fall',
        year: 2,
        semester: 'Fall'
    },
    {
        id: 'y2-spring',
        year: 2,
        semester: 'Spring'
    },
    {
        id: 'y3-fall',
        year: 3,
        semester: 'Fall'
    },
    {
        id: 'y3-spring',
        year: 3,
        semester: 'Spring'
    }
];
const mockSubjects = [
    // Computer Science Subjects
    {
        id: 'pf101',
        name: 'Programming Fundamentals',
        code: 'PF101',
        description: 'Introduction to programming',
        course_id: 'cs-1',
        year_id: 'y1-fall'
    },
    {
        id: 'math101',
        name: 'Mathematics I',
        code: 'MATH101',
        description: 'Calculus and Linear Algebra',
        course_id: 'cs-1',
        year_id: 'y1-fall'
    },
    {
        id: 'ds201',
        name: 'Data Structures',
        code: 'DS201',
        description: 'Data structures and algorithms',
        course_id: 'cs-1',
        year_id: 'y2-fall'
    },
    {
        id: 'db301',
        name: 'Database Systems',
        code: 'DB301',
        description: 'Database design and management',
        course_id: 'cs-1',
        year_id: 'y2-fall'
    },
    // Mechanical Engineering Subjects
    {
        id: 'em101',
        name: 'Engineering Mechanics',
        code: 'EM101',
        description: 'Basic engineering mechanics',
        course_id: 'me-1',
        year_id: 'y1-fall'
    },
    {
        id: 'td101',
        name: 'Thermodynamics',
        code: 'TD101',
        description: 'Thermodynamics principles',
        course_id: 'me-1',
        year_id: 'y1-spring'
    },
    {
        id: 'fm201',
        name: 'Fluid Mechanics',
        code: 'FM201',
        description: 'Fluid dynamics',
        course_id: 'me-1',
        year_id: 'y2-fall'
    },
    // Electrical Engineering Subjects
    {
        id: 'ec101',
        name: 'Electrical Circuits',
        code: 'EC101',
        description: 'Basic electrical circuits',
        course_id: 'ee-1',
        year_id: 'y1-fall'
    },
    {
        id: 'em101',
        name: 'Electromagnetics',
        code: 'EM101',
        description: 'Electromagnetic theory',
        course_id: 'ee-1',
        year_id: 'y1-spring'
    },
    {
        id: 'dsp201',
        name: 'Digital Signal Processing',
        code: 'DSP201',
        description: 'Digital signal processing',
        course_id: 'ee-1',
        year_id: 'y2-fall'
    },
    // Physics Subjects
    {
        id: 'cm101',
        name: 'Classical Mechanics',
        code: 'CM101',
        description: 'Newtonian mechanics',
        course_id: 'phy-1',
        year_id: 'y1-fall'
    },
    {
        id: 'qm201',
        name: 'Quantum Mechanics',
        code: 'QM201',
        description: 'Quantum physics',
        course_id: 'phy-1',
        year_id: 'y2-fall'
    },
    {
        id: 'tp301',
        name: 'Theoretical Physics',
        code: 'TP301',
        description: 'Advanced theoretical physics',
        course_id: 'phy-1',
        year_id: 'y3-fall'
    },
    // Chemistry Subjects
    {
        id: 'oc101',
        name: 'Organic Chemistry',
        code: 'OC101',
        description: 'Organic chemistry fundamentals',
        course_id: 'chem-1',
        year_id: 'y1-fall'
    },
    {
        id: 'ic101',
        name: 'Inorganic Chemistry',
        code: 'IC101',
        description: 'Inorganic chemistry',
        course_id: 'chem-1',
        year_id: 'y1-spring'
    },
    {
        id: 'pc201',
        name: 'Physical Chemistry',
        code: 'PC201',
        description: 'Physical chemistry',
        course_id: 'chem-1',
        year_id: 'y2-fall'
    },
    // Business Administration Subjects
    {
        id: 'mg101',
        name: 'Management Principles',
        code: 'MG101',
        description: 'Business management',
        course_id: 'bba-1',
        year_id: 'y1-fall'
    },
    {
        id: 'mk101',
        name: 'Marketing',
        code: 'MK101',
        description: 'Marketing fundamentals',
        course_id: 'bba-1',
        year_id: 'y1-spring'
    },
    {
        id: 'fn201',
        name: 'Financial Management',
        code: 'FN201',
        description: 'Financial management',
        course_id: 'bba-1',
        year_id: 'y2-fall'
    },
    // Commerce Subjects
    {
        id: 'ac101',
        name: 'Financial Accounting',
        code: 'AC101',
        description: 'Financial accounting',
        course_id: 'bcom-1',
        year_id: 'y1-fall'
    },
    {
        id: 'ca101',
        name: 'Cost Accounting',
        code: 'CA101',
        description: 'Cost accounting',
        course_id: 'bcom-1',
        year_id: 'y1-spring'
    },
    {
        id: 'tx201',
        name: 'Taxation',
        code: 'TX201',
        description: 'Tax principles',
        course_id: 'bcom-1',
        year_id: 'y2-fall'
    },
    // Economics Subjects
    {
        id: 'me101',
        name: 'Microeconomics',
        code: 'ME101',
        description: 'Microeconomic principles',
        course_id: 'eco-1',
        year_id: 'y1-fall'
    },
    {
        id: 'ma101',
        name: 'Macroeconomics',
        code: 'MA101',
        description: 'Macroeconomic theory',
        course_id: 'eco-1',
        year_id: 'y1-spring'
    },
    {
        id: 'ie201',
        name: 'International Economics',
        code: 'IE201',
        description: 'International trade',
        course_id: 'eco-1',
        year_id: 'y2-fall'
    },
    // English Literature Subjects
    {
        id: 'el101',
        name: 'English Literature I',
        code: 'EL101',
        description: 'Classical English literature',
        course_id: 'eng-1',
        year_id: 'y1-fall'
    },
    {
        id: 'el201',
        name: 'English Literature II',
        code: 'EL201',
        description: 'Modern English literature',
        course_id: 'eng-1',
        year_id: 'y2-fall'
    },
    {
        id: 'cw301',
        name: 'Creative Writing',
        code: 'CW301',
        description: 'Creative writing workshop',
        course_id: 'eng-1',
        year_id: 'y3-fall'
    },
    // History Subjects
    {
        id: 'wh101',
        name: 'World History',
        code: 'WH101',
        description: 'World history overview',
        course_id: 'hist-1',
        year_id: 'y1-fall'
    },
    {
        id: 'mh201',
        name: 'Modern History',
        code: 'MH201',
        description: 'Modern historical events',
        course_id: 'hist-1',
        year_id: 'y2-fall'
    },
    {
        id: 'ah301',
        name: 'Ancient History',
        code: 'AH301',
        description: 'Ancient civilizations',
        course_id: 'hist-1',
        year_id: 'y3-fall'
    }
];
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const parentId = searchParams.get('parent_id');
    try {
        let data = null;
        switch(type){
            case 'faculties':
                data = mockFaculties;
                break;
            case 'courses':
                // Filter courses based on faculty
                if (parentId) {
                    data = mockCourses.filter((course)=>course.faculty_id === parentId);
                } else {
                    data = mockCourses;
                }
                break;
            case 'years':
                // Filter years based on course (for demo, return all)
                data = mockYears;
                break;
            case 'subjects':
                // Filter subjects based on year
                if (parentId) {
                    data = mockSubjects.filter((subject)=>subject.year_id === parentId);
                } else {
                    data = mockSubjects;
                }
                break;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid type parameter'
                }, {
                    status: 400
                });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            data
        });
    } catch (error) {
        console.error('Server error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__414bc91d._.js.map