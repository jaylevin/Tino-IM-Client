import Vue from "vue";
import Router from "vue-router";
import LandingView from "./views/Landing.vue";
import ChatView from "./views/Chat.vue";
import DiscoverView from "./views/Discover.vue";
import FaqView from "./views/Faq.vue";
import DashboardView from "./views/Dashboard.vue";
import SignupView from "./views/Signup.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatView
    },
    {
      path: "/discover",
      name: "discover",
      component: DiscoverView
    },
    {
      path: "/faq",
      name: "faq",
      component: FaqView
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView
    }
  ]
});
