(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useAuth() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "12916c9add8092ad3acb2d7423883d07f4d18e4950a210341af1a24124833cd1") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "12916c9add8092ad3acb2d7423883d07f4d18e4950a210341af1a24124833cd1";
    }
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function AuthProvider({ children }) {
    _s1();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Check for existing session on mount
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
            setIsLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    const login = async (email, password)=>{
        setIsLoading(true);
        // Simulate authentication
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if (email && password) {
                    const mockUser = {
                        id: 'user-1',
                        name: 'John Doe',
                        email: email,
                        faculty: 'Engineering',
                        course: 'Computer Science'
                    };
                    setUser(mockUser);
                    localStorage.setItem('user', JSON.stringify(mockUser));
                    setIsLoading(false);
                    resolve();
                } else {
                    setIsLoading(false);
                    reject(new Error('Invalid credentials'));
                }
            }, 1500);
        });
    };
    const loginWithGoogle = async ()=>{
        setIsLoading(true);
        try {
            // Load Google API
            await new Promise((resolve_0, reject_0)=>{
                const script = document.createElement('script');
                script.src = 'https://accounts.google.com/gsi/client';
                script.onload = resolve_0;
                script.onerror = reject_0;
                document.head.appendChild(script);
            });
            // Initialize Google Sign-In
            const google = window.google;
            if (!google) {
                throw new Error('Google API not loaded');
            }
            // Trigger Google OAuth flow
            const tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: ("TURBOPACK compile-time value", "7329025228-q8u70qbfjb75c3d3o16lo6nj605npots.apps.googleusercontent.com") || '7329025228-q8u70qbfjb75c3d3o16lo6nj605npots.apps.googleusercontent.com',
                scope: 'openid email profile',
                callback: async (tokenResponse)=>{
                    if (tokenResponse.access_token) {
                        try {
                            // Send token to your backend for verification
                            const response = await fetch('/api/auth/google', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    token: tokenResponse.access_token
                                })
                            });
                            if (!response.ok) {
                                throw new Error('Google authentication failed');
                            }
                            const { user: user_0 } = await response.json();
                            const appUser = {
                                id: user_0.id,
                                name: user_0.name,
                                email: user_0.email,
                                picture: user_0.picture,
                                provider: 'google',
                                faculty: 'Not specified',
                                course: 'Not specified'
                            };
                            setUser(appUser);
                            localStorage.setItem('user', JSON.stringify(appUser));
                            setIsLoading(false);
                        } catch (error_0) {
                            console.error('Google auth error:', error_0);
                            setIsLoading(false);
                            throw error_0;
                        }
                    } else {
                        setIsLoading(false);
                        throw new Error('No access token received');
                    }
                }
            });
            tokenClient.requestAccessToken();
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem('user');
        router.push('/auth');
    };
    const value = {
        user,
        login,
        loginWithGoogle,
        logout,
        isLoading
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/contexts/AuthContext.tsx",
        lineNumber: 161,
        columnNumber: 10
    }, this);
}
_s1(AuthProvider, "8WEfEbosx3NfLBPRVajZSQS3udc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_contexts_AuthContext_tsx_396e1d04._.js.map