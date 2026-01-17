# Acting Up Content Management Guide

This guide provides instructions for managing the content on the Acting Up website. The website is designed to be updated easily without needing to write any code.

The two main types of content you can manage are the **Class Schedule** and the **Photo Gallery**.

The recommended way to manage this content is by using Google Sheets. You will create two separate Google Sheets, one for the schedule and one for the gallery, and then publish them to the web. The website will automatically fetch the latest data from your published sheets.

## Table of Contents

1.  [Managing the Class Schedule](#managing-the-class-schedule)
    *   [Step 1: Create a Google Sheet for the Schedule](#step-1-create-a-google-sheet-for-the-schedule)
    *   [Step 2: Format Your Schedule Data](#step-2-format-your-schedule-data)
    *   [Step 3: Publish the Google Sheet to the Web](#step-3-publish-the-google-sheet-to-the-web)
    *   [Step 4: Using the Schedule Helper Tool](#step-4-using-the-schedule-helper-tool)
2.  [Managing the Photo Gallery](#managing-the-photo-gallery)
    *   [Step 1: Create a Google Sheet for the Gallery](#step-1-create-a-google-sheet-for-the-gallery)
    *   [Step 2: Format Your Gallery Data](#step-2-format-your-gallery-data)
    *   [Step 3: Publish the Google Sheet to the Web](#step-3-publish-the-google-sheet-to-the-web)
3.  [Alternative Method: Using Local Files](#alternative-method-using-local-files)

---

## Managing the Class Schedule

### Step 1: Create a Google Sheet for the Schedule

1.  Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2.  Give it a descriptive name, like "Acting Up Class Schedule".

### Step 2: Format Your Schedule Data

The website expects the schedule data to be in a specific format. The first row of your spreadsheet **must** be the header row with the following column names (in any order):

*   `Class`
*   `Day`
*   `Time`
*   `Ages`
*   `Teacher`
*   `Location`
*   `Status`

Here is an example of what the data should look like. You can use this as a template.

| Class                  | Day       | Time          | Ages  | Teacher | Location      | Status  |
| ---------------------- | --------- | ------------- | ----- | ------- | ------------- | ------- |
| Creative Dramatics     | Monday    | 4:00-5:00 PM  | 5-7   | Anna    | Main Studio   | Open    |
| Acting I               | Monday    | 5:00-6:00 PM  | 8-10  | Anna    | Main Studio   | Full    |
| Acting II / Improv     | Tuesday   | 4:30-5:30 PM  | 11-14 | Brian   | Black Box     | Open    |
| Musical Theatre        | Wednesday | 4:00-5:30 PM  | 8-12  | Chloe   | Main Studio   | Open    |
| Advanced Acting        | Thursday  | 5:30-7:00 PM  | 14-18 | David   | Black Box     | Waitlist|

You can find a sample CSV file to download and import into your Google Sheet here: [index.sample.csv](../app/public/class-schedule/index.sample.csv).

### Step 3: Publish the Google Sheet to the Web

For the website to access your schedule, you need to publish the Google Sheet.

1.  In your Google Sheet, go to `File` > `Share` > `Publish to web`.
2.  In the dialog box that appears:
    *   Under `Link`, make sure the sheet containing your schedule is selected.
    *   Under `Embed`, select `Comma-separated values (.csv)`.
3.  Click the **Publish** button.
4.  Copy the generated URL. This is the URL you will provide to the website administrator to configure in the environment variables (`VITE_SCHEDULE_CSV_URL`).

### Step 4: Using the Schedule Helper Tool

The website has a built-in tool to help you validate your schedule data.

1.  Go to the `/schedule-helper` page on the website (e.g., `https://yourwebsite.com/schedule-helper`).
2.  Paste the URL of your published Google Sheet CSV into the input box.
3.  The tool will show you how the data is being parsed and will highlight any potential errors. This is a great way to check your work before asking the administrator to update the live site.

---

## Managing the Photo Gallery

### Step 1: Create a Google Sheet for the Gallery

1.  Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2.  Give it a descriptive name, like "Acting Up Photo Gallery".

### Step 2: Format Your Gallery Data

The gallery spreadsheet needs two columns in the header row:

*   `Show`
*   `Image URL`

The `Show` column is for the name of the production or event. The `Image URL` column must contain a direct public link to an image file (e.g., ending in `.jpg`, `.png`, `.gif`).

**Important:** You will need to host your images somewhere publicly accessible. You can use services like Imgur, Flickr, or any web hosting that allows direct linking to images.

Here is an example:

| Show                 | Image URL                                       |
| -------------------- | ----------------------------------------------- |
| A Midsummer Night's Dream | `https://i.imgur.com/your-image-id-1.jpg`     |
| A Midsummer Night's Dream | `https://i.imgur.com/your-image-id-2.jpg`     |
| The Wizard of Oz     | `https://i.imgur.com/another-image-id.png`    |
| Improv Night         | `https://i.imgur.com/a-different-image.gif`   |

### Step 3: Publish the Google Sheet to the Web

The process is the same as for the class schedule.

1.  In your Google Sheet, go to `File` > `Share` > `Publish to web`.
2.  In the dialog box:
    *   Select your gallery sheet.
    *   Select `Comma-separated values (.csv)`.
3.  Click **Publish**.
4.  Copy the generated URL and provide it to the website administrator to configure as `VITE_GALLERY_SHEET_URL`.

---

## Alternative Method: Using Local Files

If you prefer not to use Google Sheets, the website can also be configured to use local files stored on the server. This is a fallback mechanism and is less flexible for quick updates.

*   **Schedule:** The schedule can be managed by a CSV file located at `app/public/class-schedule/index.csv`.
*   **Gallery:** The gallery can be managed by JSON files located in the `gallery/` directory.

To update these files, you will need to have access to the server where the website is hosted. For this reason, **the Google Sheets method is strongly recommended** for anyone who is not a developer.
