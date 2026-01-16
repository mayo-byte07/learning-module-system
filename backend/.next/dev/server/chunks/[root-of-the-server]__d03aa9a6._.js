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
"[project]/backend/app/api/stats/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Mock stats data
const mockStats = {
    papersCount: 1247,
    facultiesCount: 4,
    coursesCount: 5,
    recentPapers: [
        {
            id: 'paper-1',
            title: 'CS201 Final Exam 2024',
            paper_type: 'past_paper',
            created_at: '2024-12-15T10:00:00Z',
            file_size: 2048576,
            subjects: {
                name: 'Programming Fundamentals',
                code: 'PF101',
                years: {
                    year: 1,
                    semester: 'Fall',
                    courses: {
                        name: 'Computer Science',
                        code: 'CS',
                        faculties: {
                            name: 'Engineering'
                        }
                    }
                }
            }
        },
        {
            id: 'paper-2',
            title: 'MATH101 Midterm Exam 2024',
            paper_type: 'past_paper',
            created_at: '2024-10-20T14:30:00Z',
            file_size: 1536000,
            subjects: {
                name: 'Mathematics I',
                code: 'MATH101',
                years: {
                    year: 1,
                    semester: 'Fall',
                    courses: {
                        name: 'Computer Science',
                        code: 'CS',
                        faculties: {
                            name: 'Engineering'
                        }
                    }
                }
            }
        },
        {
            id: 'paper-3',
            title: 'Data Structures Mock Test 1',
            paper_type: 'mock_test',
            created_at: '2024-11-10T09:15:00Z',
            file_size: 1024000,
            subjects: {
                name: 'Data Structures',
                code: 'DS201',
                years: {
                    year: 2,
                    semester: 'Fall',
                    courses: {
                        name: 'Computer Science',
                        code: 'CS',
                        faculties: {
                            name: 'Engineering'
                        }
                    }
                }
            }
        },
        {
            id: 'paper-4',
            title: 'Database Systems Notes',
            paper_type: 'notes',
            created_at: '2024-09-05T16:45:00Z',
            file_size: 512000,
            subjects: {
                name: 'Database Systems',
                code: 'DB301',
                years: {
                    year: 2,
                    semester: 'Fall',
                    courses: {
                        name: 'Computer Science',
                        code: 'CS',
                        faculties: {
                            name: 'Engineering'
                        }
                    }
                }
            }
        },
        {
            id: 'paper-5',
            title: 'Engineering Mechanics Final',
            paper_type: 'past_paper',
            created_at: '2024-11-25T11:00:00Z',
            file_size: 2560000,
            subjects: {
                name: 'Engineering Mechanics',
                code: 'EM101',
                years: {
                    year: 1,
                    semester: 'Fall',
                    courses: {
                        name: 'Mechanical Engineering',
                        code: 'ME',
                        faculties: {
                            name: 'Engineering'
                        }
                    }
                }
            }
        }
    ],
    faculties: [
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
    ]
};
async function GET() {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(mockStats);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__d03aa9a6._.js.map