import { ComponentLoader } from "adminjs";
import { getModelByName } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import passwordsFeature from "@adminjs/passwords";

export const prisma = new PrismaClient();

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add("Dashboard", "./components/Dashboard"),
  CustomPanel: componentLoader.add("CustomPanel", "./components/CustomPanel"),
  ApplicationDetailPage: componentLoader.add(
    "ApplicationDetailPage",
    "./components/ApplicationDetailPage"
  ),
};

export const authenticateHandler = async (email, password) => {
  const employee = await prisma.employee.findUnique({
    where: { email },
  });

  if (employee && (await argon2.verify(employee.password, password))) {
    return Promise.resolve(employee);
  }
  return null;
};

const applicationDetailHandler = async () => {
  const applicants = await prisma.applicant.findFirst({});
  return { applicants };
};

// const dashboardHandler = async () => {
//   const statusCountsData = await prisma.visa_applications.groupBy({
//     by: ["status"],
//     _count: {
//       status: true,
//     },
//   });
//   const dateVolumeData = await prisma.visa_applications.groupBy({
//     by: ["application_date"],
//     _count: {
//       application_id: true,
//     },
//     orderBy: {
//       application_date: "desc", // Order by date in descending order to get the latest dates first
//     },
//   });
//   if (dateVolumeData.length > 5) dateVolumeData = dateVolumeData.slice(0, 5);

//   const statusCounts = statusCountsData.map((e) => ({
//     name: e.status,
//     value: e._count.status,
//   }));

//   const dateVolume = dateVolumeData
//     .map((item, i) => ({
//       date: item.application_date.toISOString().split("T")[0], // Convert DateTime to "YYYY-MM-DD" format
//       applications: item._count.application_id, // Number of applications
//     }))
//     .reverse();

//   return { statusCounts, dateVolume };
// };

const actions = {
  new: {
    isAccessible: ({ currentAdmin }) => currentAdmin?.isAdmin, // Allow create only if admin
  },
  edit: {
    isAccessible: ({ currentAdmin }) => currentAdmin?.isAdmin, // Allow edit only if admin
  },
  delete: {
    isAccessible: ({ currentAdmin }) => currentAdmin?.isAdmin, // Allow delete only if admin
  },
};

export const adminOptions = {
  dashboard: {
    component: Components.Dashboard,
    // handler: dashboardHandler,
  },

  pages: {
    customPanel: {
      label: "Custom Panel",
      component: Components.CustomPanel,
    },
    applicationDetailPanel: {
      label: "Application Detail Page",
      component: Components.ApplicationDetailPage,
      handler: applicationDetailHandler,
    },
  },
  componentLoader,
  resources: [
    {
      resource: {
        model: getModelByName("Applicant"),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName("ApplicantEntity"),
        client: prisma,
      },
    },
    {
      resource: {
        model: getModelByName("Country"),
        client: prisma,
        actions,
      },
    },
    {
      resource: {
        model: getModelByName("CountryGroup"),
        client: prisma,
        actions,
      },
    },
    {
      resource: {
        model: getModelByName("CountryGroupMember"),
        client: prisma,
        actions,
      },
    },
    {
      resource: {
        model: getModelByName("Employee"),
        client: prisma,
        actions: actions,
      },
      options: {
        properties: { password: { isVisible: false } },
      },
      features: [
        passwordsFeature({
          componentLoader,
          properties: { password: "Password", encryptedPassword: "password" },
          hash: argon2.hash,
        }),
      ],
    },
    {
      resource: {
        model: getModelByName("EntityMember"),
        client: prisma,
        actions,
      },
    },
    {
      resource: {
        model: getModelByName("FreeVisaCountry"),
        client: prisma,
        actions,
      },
    },
    {
      resource: {
        model: getModelByName("PastTravelDetails"),
        client: prisma,
        actions,
      },
    },
    {
      resource: {
        model: getModelByName("RefreshTokens"),
        client: prisma,
        actions,
      },
    },
    {
      resource: {
        model: getModelByName("User"),
        client: prisma,
        actions,
      },
    },
    {
      resource: {
        model: getModelByName("UserCred"),
        client: prisma,
        actions,
      },
    },
    {
      resource: {
        model: getModelByName("VisaCountryGroupFee"),
        client: prisma,
        actions,
      },
    },
    {
      resource: {
        model: getModelByName("VisaType"),
        client: prisma,
        actions,
      },
    },
  ],
  branding: {
    companyName: "Visa Application Admin",
    logo: "https://i.imgur.com/km8pyQx.png",
    softwareBrothers: false,
  },
};

// options: {
//   parent: { name: "Database", icon: "Database" },
//   properties: {
//     id: {
//       isVisible: {
//         edit: false,
//         show: false,
//         list: false,
//         filter: false,
//       }, // Hide ID as it's autogenerated
//     },
//     applicant: {
//       isTitle: true, // Sets this field as the title in the list view
//       type: "string", // Ensures a text field for the applicant's name
//     },
//     status: {
//       availableValues: [
//         { value: "Pending", label: "Pending" },
//         { value: "Approved", label: "Approved" },
//         { value: "Rejected", label: "Rejected" },
//       ], // Dropdown for status selection
//     },
//     createdAt: {
//       isVisible: { edit: false, show: true, list: true, filter: true }, // Hide from the form, show in other views
//     },
//     updatedAt: {
//       isVisible: { edit: false, show: true, list: true, filter: true }, // Hide from the form, show in other views
//     },
//   },
// },
