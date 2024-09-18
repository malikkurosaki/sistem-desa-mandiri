export const pages = {
  "/": "/",
  "/(auth)/welcome": "/(auth)/welcome",
  "/(auth)/verification": "/(auth)/verification",
  "/(application)/web-push": "/(application)/web-push",
  "/(application)/project": "/(application)/project",
  "/(application)/project/update/[id]": ({ id }: { id: string }) =>
    `/(application)/project/update/${id}`,
  "/(application)/project/create": "/(application)/project/create",
  "/(application)/project/[id]": ({ id }: { id: string }) =>
    `/(application)/project/${id}`,
  "/(application)/project/[id]/edit": ({ id }: { id: string }) =>
    `/(application)/project/${id}/edit`,
  "/(application)/project/[id]/cancel": ({ id }: { id: string }) =>
    `/(application)/project/${id}/cancel`,
  "/(application)/project/[id]/add-task": ({ id }: { id: string }) =>
    `/(application)/project/${id}/add-task`,
  "/(application)/project/[id]/add-member": ({ id }: { id: string }) =>
    `/(application)/project/${id}/add-member`,
  "/(application)/project/[id]/add-file": ({ id }: { id: string }) =>
    `/(application)/project/${id}/add-file`,
  "/(application)/profile": "/(application)/profile",
  "/(application)/profile/edit": "/(application)/profile/edit",
  "/(application)/position": "/(application)/position",
  "/(application)/member": "/(application)/member",
  "/(application)/member/edit/[id]": ({ id }: { id: string }) =>
    `/(application)/member/edit/${id}`,
  "/(application)/member/create": "/(application)/member/create",
  "/(application)/member/[id]": ({ id }: { id: string }) =>
    `/(application)/member/${id}`,
  "/(application)/home": "/(application)/home",
  "/(application)/group": "/(application)/group",
  "/(application)/division": "/(application)/division",
  "/(application)/division/report/[id]": ({ id }: { id: string }) =>
    `/(application)/division/report/${id}`,
  "/(application)/division/info/[id]": ({ id }: { id: string }) =>
    `/(application)/division/info/${id}`,
  "/(application)/division/edit/[id]": ({ id }: { id: string }) =>
    `/(application)/division/edit/${id}`,
  "/(application)/division/create": "/(application)/division/create",
  "/(application)/division/add-member/[id]": ({ id }: { id: string }) =>
    `/(application)/division/add-member/${id}`,
  "/(application)/division/[id]": ({ id }: { id: string }) =>
    `/(application)/division/${id}`,
  "/(application)/division/[id]/(fitur-division)/task": ({
    id,
  }: {
    id: string;
  }) => `/(application)/division/${id}/(fitur-division)/task`,
  "/(application)/division/[id]/(fitur-division)/task/edit/[detail]": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) => `/(application)/division/${id}/(fitur-division)/task/edit/${detail}`,
  "/(application)/division/[id]/(fitur-division)/task/create": ({
    id,
  }: {
    id: string;
  }) => `/(application)/division/${id}/(fitur-division)/task/create`,
  "/(application)/division/[id]/(fitur-division)/task/[detail]": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) => `/(application)/division/${id}/(fitur-division)/task/${detail}`,
  "/(application)/division/[id]/(fitur-division)/task/[detail]/edit": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) => `/(application)/division/${id}/(fitur-division)/task/${detail}/edit`,
  "/(application)/division/[id]/(fitur-division)/task/[detail]/cancel": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) => `/(application)/division/${id}/(fitur-division)/task/${detail}/cancel`,
  "/(application)/division/[id]/(fitur-division)/task/[detail]/add-task": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) =>
    `/(application)/division/${id}/(fitur-division)/task/${detail}/add-task`,
  "/(application)/division/[id]/(fitur-division)/task/[detail]/add-member": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) =>
    `/(application)/division/${id}/(fitur-division)/task/${detail}/add-member`,
  "/(application)/division/[id]/(fitur-division)/task/[detail]/add-file": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) =>
    `/(application)/division/${id}/(fitur-division)/task/${detail}/add-file`,
  "/(application)/division/[id]/(fitur-division)/document": ({
    id,
  }: {
    id: string;
  }) => `/(application)/division/${id}/(fitur-division)/document`,
  "/(application)/division/[id]/(fitur-division)/discussion": ({
    id,
  }: {
    id: string;
  }) => `/(application)/division/${id}/(fitur-division)/discussion`,
  "/(application)/division/[id]/(fitur-division)/discussion/update/[detail]": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) =>
    `/(application)/division/${id}/(fitur-division)/discussion/update/${detail}`,
  "/(application)/division/[id]/(fitur-division)/discussion/create": ({
    id,
  }: {
    id: string;
  }) => `/(application)/division/${id}/(fitur-division)/discussion/create`,
  "/(application)/division/[id]/(fitur-division)/discussion/[detail]": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) => `/(application)/division/${id}/(fitur-division)/discussion/${detail}`,
  "/(application)/division/[id]/(fitur-division)/calender": ({
    id,
  }: {
    id: string;
  }) => `/(application)/division/${id}/(fitur-division)/calender`,
  "/(application)/division/[id]/(fitur-division)/calender/update/[detail]": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) =>
    `/(application)/division/${id}/(fitur-division)/calender/update/${detail}`,
  "/(application)/division/[id]/(fitur-division)/calender/history": ({
    id,
  }: {
    id: string;
  }) => `/(application)/division/${id}/(fitur-division)/calender/history`,
  "/(application)/division/[id]/(fitur-division)/calender/create": ({
    id,
  }: {
    id: string;
  }) => `/(application)/division/${id}/(fitur-division)/calender/create`,
  "/(application)/division/[id]/(fitur-division)/calender/[detail]": ({
    id,
    detail,
  }: {
    id: string;
    detail: string;
  }) => `/(application)/division/${id}/(fitur-division)/calender/${detail}`,
  "/(application)/division/[id]/(fitur-division)/calender/[detail]/add-member":
    ({ id, detail }: { id: string; detail: string }) =>
      `/(application)/division/${id}/(fitur-division)/calender/${detail}/add-member`,
  "/(application)/color-palette": "/(application)/color-palette",
  "/(application)/color-palette/edit/[id]": ({ id }: { id: string }) =>
    `/(application)/color-palette/edit/${id}`,
  "/(application)/color-palette/create": "/(application)/color-palette/create",
  "/(application)/announcement": "/(application)/announcement",
  "/(application)/announcement/edit/[id]": ({ id }: { id: string }) =>
    `/(application)/announcement/edit/${id}`,
  "/(application)/announcement/create-user":
    "/(application)/announcement/create-user",
  "/(application)/announcement/create": "/(application)/announcement/create",
  "/(application)/announcement/[id]": ({ id }: { id: string }) =>
    `/(application)/announcement/${id}`,
};

export const apies = {
  "/api/village/post": "/api/village/post",
  "/api/village/get": "/api/village/get",
  "/api/user": "/api/user",
  "/api/user/profile": "/api/user/profile",
  "/api/user/[id]": ({ id }: { id: string }) => `/api/user/${id}`,
  "/api/unsubscribe": "/api/unsubscribe",
  "/api/theme": "/api/theme",
  "/api/theme/[id]": ({ id }: { id: string }) => `/api/theme/${id}`,
  "/api/task": "/api/task",
  "/api/task/file/[id]": ({ id }: { id: string }) => `/api/task/file/${id}`,
  "/api/task/detail/[id]": ({ id }: { id: string }) => `/api/task/detail/${id}`,
  "/api/task/[id]": ({ id }: { id: string }) => `/api/task/${id}`,
  "/api/task/[id]/member": ({ id }: { id: string }) => `/api/task/${id}/member`,
  "/api/set-subscribe": "/api/set-subscribe",
  "/api/send-notification": "/api/send-notification",
  "/api/role-user": "/api/role-user",
  "/api/project": "/api/project",
  "/api/project/file/[id]": ({ id }: { id: string }) =>
    `/api/project/file/${id}`,
  "/api/project/detail/[id]": ({ id }: { id: string }) =>
    `/api/project/detail/${id}`,
  "/api/project/[id]": ({ id }: { id: string }) => `/api/project/${id}`,
  "/api/project/[id]/member": ({ id }: { id: string }) =>
    `/api/project/${id}/member`,
  "/api/position": "/api/position",
  "/api/position/[id]": ({ id }: { id: string }) => `/api/position/${id}`,
  "/api/home": "/api/home",
  "/api/home/search": "/api/home/search",
  "/api/group": "/api/group",
  "/api/group/get-division": "/api/group/get-division",
  "/api/group/[id]": ({ id }: { id: string }) => `/api/group/${id}`,
  "/api/get-subscribe": "/api/get-subscribe",
  "/api/file/img": "/api/file/img",
  "/api/document": "/api/document",
  "/api/document/upload": "/api/document/upload",
  "/api/document/more": "/api/document/more",
  "/api/division": "/api/division",
  "/api/division/report": "/api/division/report",
  "/api/division/more": "/api/division/more",
  "/api/division/[id]": ({ id }: { id: string }) => `/api/division/${id}`,
  "/api/division/[id]/member": ({ id }: { id: string }) =>
    `/api/division/${id}/member`,
  "/api/division/[id]/detail": ({ id }: { id: string }) =>
    `/api/division/${id}/detail`,
  "/api/discussion": "/api/discussion",
  "/api/discussion/[id]": ({ id }: { id: string }) => `/api/discussion/${id}`,
  "/api/discussion/[id]/comment": ({ id }: { id: string }) =>
    `/api/discussion/${id}/comment`,
  "/api/calender": "/api/calender",
  "/api/calender/indicator": "/api/calender/indicator",
  "/api/calender/history": "/api/calender/history",
  "/api/calender/[id]": ({ id }: { id: string }) => `/api/calender/${id}`,
  "/api/calender/[id]/member": ({ id }: { id: string }) =>
    `/api/calender/${id}/member`,
  "/api/auth/logout": "/api/auth/logout",
  "/api/auth/login": "/api/auth/login",
  "/api/auth/get-user-by-cookies": "/api/auth/get-user-by-cookies",
  "/api/announcement": "/api/announcement",
  "/api/announcement/[id]": ({ id }: { id: string }) =>
    `/api/announcement/${id}`,
};
