# Qiita-backup
Automatic backup for Qiita items with firebase.

# How to use

After project clone, init firebase.  
※ **Select a Blaze plan** project. Because use external access for Qiita.

```
firebase init
```

Set Qiita api key to firebase functions config. (get [here](https://qiita.com/settings/applications)

```
firebase functions:config:set qiita.key="<YOUR_KEY>"
```

Install dependencies.

```
cd functions
npm i
```

Deploy functions.

```
npm run deploy
```

Set Qiita Backup functions Completed.
Your Qiita items are backed up weekly.


# Manual backup
If you want to perform a manual backup?
After deploy functions, call https function.

```
curl https://<YOUR_FUNCTIONS_URL>/backupQiitaItems
// Successfully saved xxx items.⏎
```

# Customize

customize backed up schedule.
fix `functions/src/index.ts`.

```functions/src/index.ts
const BACKUP_SCHEDULE = "0 9 * * 1";
```






