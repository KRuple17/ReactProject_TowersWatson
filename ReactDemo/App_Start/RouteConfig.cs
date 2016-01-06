using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ReactDemo
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "AllComments",
                url: "Contacts",
                defaults: new { controller ="Home", action = "Contacts"}
                );

            routes.MapRoute(
                name: "AddNewContact",
                url: "AddContact",
                defaults: new { controller = "Home", action = "AddContact"}
                );

            routes.MapRoute(
                name: "UpdateContact",
                url: "UpdateContact",
                defaults: new { controller = "Home", action = "UpdateContact"}
                );

            routes.MapRoute(
                name: "DeleteContact",
                url: "DeleteContact",
                defaults: new { controller = "Home", action = "DeleteContact" }
                );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
