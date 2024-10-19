const schemas = [
  [
    {
      className: "_User",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        username: {
          type: "String",
        },
        password: {
          type: "String",
        },
        email: {
          type: "String",
        },
        emailVerified: {
          type: "Boolean",
        },
        authData: {
          type: "Object",
        },
        tags: {
          type: "Array",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
        username_1: {
          username: 1,
        },
        case_insensitive_username: {
          username: 1,
        },
        case_insensitive_email: {
          email: 1,
        },
        email_1: {
          email: 1,
        },
      },
    },
    {
      className: "_Role",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        name: {
          type: "String",
        },
        users: {
          type: "Relation",
          targetClass: "_User",
        },
        roles: {
          type: "Relation",
          targetClass: "_Role",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
        name_1: {
          name: 1,
        },
      },
    },
    {
      className: "_Installation",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        installationId: {
          type: "String",
        },
        deviceToken: {
          type: "String",
        },
        channels: {
          type: "Array",
        },
        deviceType: {
          type: "String",
        },
        pushType: {
          type: "String",
        },
        GCMSenderId: {
          type: "String",
        },
        timeZone: {
          type: "String",
        },
        localeIdentifier: {
          type: "String",
        },
        badge: {
          type: "Number",
        },
        appVersion: {
          type: "String",
        },
        appName: {
          type: "String",
        },
        appIdentifier: {
          type: "String",
        },
        parseVersion: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
    },
    {
      className: "_Product",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        productIdentifier: {
          type: "String",
        },
        download: {
          type: "File",
        },
        downloadName: {
          type: "String",
        },
        icon: {
          type: "File",
        },
        order: {
          type: "Number",
        },
        title: {
          type: "String",
        },
        subtitle: {
          type: "String",
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
    },
    {
      className: "Blogs",
      fields: {
        objectId: {
          type: "String",
        },
        createdAt: {
          type: "Date",
        },
        updatedAt: {
          type: "Date",
        },
        ACL: {
          type: "ACL",
        },
        title: {
          type: "String",
          required: true,
        },
        subtitle: {
          type: "String",
          required: false,
        },
        body: {
          type: "String",
          required: false,
        },
        author: {
          type: "Relation",
          targetClass: "_User",
          required: false,
        },
        withDefault: {
          type: "String",
          required: true,
          defaultValue: "Taste Me",
        },
        tags: {
          type: "Array",
          required: false,
        },
      },
      classLevelPermissions: {
        find: {
          "*": true,
        },
        count: {
          "*": true,
        },
        get: {
          "*": true,
        },
        create: {
          "*": true,
        },
        update: {
          "*": true,
        },
        delete: {
          "*": true,
        },
        addField: {
          "*": true,
        },
        protectedFields: {
          "*": [],
        },
      },
      indexes: {
        _id_: {
          _id: 1,
        },
      },
    },
  ],
];

module.exports = schemas;
