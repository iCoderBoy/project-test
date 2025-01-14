import { Article, AutoAwesome, Email, Home, Logout, School, Settings } from "@mui/icons-material";

export default function LeftSidebar() {
  return (
    <div class="left-sidebar bg-white h-[80vh] w-20 flex flex-col items-center justify-center rounded-full transition duration-300">
      <div class="left-sidebar-logoBx">{/* logo */}</div>
      <div class="left-sidebar-menuBx flex flex-col items-start justify-center py-2">
        <div class="menuBx-item active flex items-center py-2 relative text-gray-500">
          <a
            class="menuBx-item-links w-10 h-10 flex items-center justify-center rounded-full font-bold bg-black text-white"
            href="/home"
          >
            <Home />
          </a>
        </div>
        <div class="menuBx-item flex items-center py-2 relative text-gray-500">
          <a
            class="menuBx-item-links w-10 h-10 flex items-center justify-center rounded-full font-bold text-black"
            href="/home"
          >
            <School />
          </a>
        </div>
        <div class="menuBx-item flex items-center py-2 relative text-gray-500">
          <a
            class="menuBx-item-links w-10 h-10 flex items-center justify-center rounded-full font-bold text-black"
            href="/home"
          >
            <Article />
          </a>
        </div>
        <div class="menuBx-item flex items-center py-2 relative text-gray-500">
          <a
            class="menuBx-item-links w-10 h-10 flex items-center justify-center rounded-full font-bold text-black"
            href="/home"
          >
            <AutoAwesome />
          </a>
        </div>
        <div class="menuBx-item flex items-center py-2 relative text-gray-500">
          <a
            class="menuBx-item-links w-10 h-10 flex items-center justify-center rounded-full font-bold text-black"
            href="/home"
          >
            <Email />
          </a>
          <span class="message-counter absolute top-0 right-0 h-4 w-4 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-xs">
            4
          </span>
        </div>
        <div class="menuBx-item flex items-center py-2 relative text-gray-500">
          <a
            class="menuBx-item-links w-10 h-10 flex items-center justify-center rounded-full font-bold text-black"
            href="/home"
          >
            <Settings />
          </a>
        </div>
      </div>
      <div class="menuBx-item logoutBx flex items-center py-2 text-red-600">
        <a
          class="menuBx-item-links w-10 h-10 flex items-center justify-center rounded-full font-bold text-red-600"
          href="/logout"
        >
          <Logout />
        </a>
      </div>
    </div>
  );
}
