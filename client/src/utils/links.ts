export const clientSidebarLinks = [
  {
    label: "Home",
    link: `/`,
    value: "",
  },
  {
    label: "Bookings",
    link: `/bookings`,
    value: "bookings",
  },
  {
    label: "Session",
    link: (userId: string) => `/session/${userId}`,
    value: "session",
  },
];

export const photographerSidebarLinks = [
  {
    label: "Profile",
    link: (userId: string) => `/photographer/${userId}`,
    value: "photographer",
  },
  {
    label: "Bookings",
    link: `/bookings`,
    value: "bookings",
  },
  {
    label: "Session",
    link: (userId: string) => `/session/${userId}`,
    value: "session",
  },
  {
    label: "Upload pictures",
    link: (userId: string) => `/upload/photographer/${userId}`,
    value: "upload",
  },
  {
    label: "Edit profile",
    link: (photographerId: string) => `/edit/photographer/${photographerId}`,
    value: "edit",
  },
];
