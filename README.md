# Qiita-backup
Automatic backup for Qiita items with firebase.

# How to use
Init firebase project.
**Select a Blaze plan project**. Because use external access for Qiita api with functions.

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





