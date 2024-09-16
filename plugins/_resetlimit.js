let cron = require("node-cron");
let handler = (m) => m;
let messageSent = false;

handler.before = async function (m) {
  cron.schedule(
    "00 00 * * *",
    async () => {
      let users = global.db.data.users;

      // Filter to reset only free users' limits
      let resetUsers = Object.entries(users).filter(
        ([user, data]) => data.limit < 10000000 && !data.premium,
      );

      if (resetUsers.length > 0 && !messageSent) {
        let limit = 150; // Reset limit to 150

        resetUsers.forEach(([user, data]) => {
          data.limit = limit;
        });
        console.log("Reset Limit");

        // Fetch all group IDs
        let groups = await conn.groupFetchAllParticipating();
        let groupIds = Object.keys(groups);

        const message = "limit seluruh user telah di reset menjadi 150 limit";

        groupIds.forEach(groupId => {
          conn.fakeReply(
            groupId,
            message,
            '0@s.whatsapp.net',
            'ManzMD :›',
            'status@broadcast'
          );
        });

        messageSent = true;
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Jakarta",
    },
  );
};

module.exports = handler;