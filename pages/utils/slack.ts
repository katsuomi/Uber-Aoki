export const submitTaxiRequest = (data: any) => {
  try {
    const url = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;
    const content = {
      text: "From Uber Aoki",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Uber Aokiより、送迎の依頼がありました"
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `名前: ${data.name}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `場所: ${data.place}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `希望到着時刻: ${data.arrivalTime}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `連絡先: ${data.phoneNumber}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `想い: ${data.thought}`
          }
        },

      ]
    };
    const xml = new XMLHttpRequest();
    xml.open("POST", url, false);
    xml.setRequestHeader(
      "content-type",
      "application/x-www-form-urlencoded;charset=UTF-8"
    );
    xml.send(`payload=${JSON.stringify(content)}`);

    const success = { success: "200 ok, success" };
    return { success };
  } catch(error) {
    return { error };
  }
};
