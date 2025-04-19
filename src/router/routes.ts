
export const constantRoute = [
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        name: "login",
        meta: {
            title: "login",
            hidden: true,
        },
    },
    {
        path: "/",
        component: () => import("@/layout/index.vue"),
        meta: {
            title: "layout",

            redirect: "/home",
        },
        children: [
            {
                path: "/home",
                component: () => import("@/views/home/index.vue"),
                name: "home",
                meta: {
                    title: "home",
                    icon: "HomeFilled",
                },
            },
        ],
    },
    {
        path: "/screen",
        component: () => import("@/views/screen/index.vue"),
        name: "screen",
        meta: {
            title: "screen",
            icon: "Monitor",
        },
    },
    {
        path: "/404",
        component: () => import("@/views/404/index.vue"),
        name: "404",
        meta: {
            title: "404",
            hidden: true,
        },
    },
    {
        path: "/acl",
        component: () => import("@/layout/index.vue"),
        name: "Acl",
        meta: {
            title: "权限管理",
            icon: "Lock",
        },
        children: [
            {
                path: "/acl/user",
                component: () => import("@/views/acl/user/index.vue"),
                name: "User",
                meta: {
                    title: "用户管理",
                    icon: "User",
                },
            },
            {
                path: "/acl/role",
                component: () => import("@/views/acl/role/index.vue"),
                name: "Role",
                meta: {
       
                    title: "角色管理",
                    icon: "UserFilled",
                },
            },
            {
                path: "/acl/permission",
                component: () => import("@/views/acl/permission/index.vue"),
                name: "Permission",
                meta: {
             
                    title: "菜单管理",
                    icon: "Monitor",
                },
            },
        ],
    },

    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
        name: "any",
        meta: {
            title: "any",
            hidden: true,
        },
    },
    {
        path: "/product",
        component: () => import("@/layout/index.vue"),
        name: "Product",
        meta: {
            title: "商品管理",
     
            icon: "Goods",
        },
        redirect: "/product/trademark",
        children: [
            {
                path: "/product/trademark",
                component: () => import("@/views/product/trademark/index.vue"),
                name: "Trademark",
                meta: {
                    title: "品牌管理",
                    icon: "ShoppingCart",
    
                },
            },
            {
                path: "/product/attr",
                component: () => import("@/views/product/attr/index.vue"),
                name: "Attr",
                meta: {
                    title: "属性管理",
                    icon: "Management",
       
                },
            },
            {
                path: "/product/spu",
                component: () => import("@/views/product/spu/index.vue"),
                name: "Spu",
                meta: {
                    title: "Spu",
                    icon: "SetUp",
     
                },
            },
            {
                path: "/product/sku",
                component: () => import("@/views/product/sku/index.vue"),
                name: "Sku",
                meta: {
                    title: "Sku",
                    icon: "ScaleToOriginal",
            
                },
            },
        ],
    },
];
