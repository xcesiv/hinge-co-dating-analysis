export default function makeGraphs(stats, matchData) {
  // Likes Over Time Graph
  let timestamps = matchData.map((m) => {
    if (m.like) {
      return m.like[0].timestamp;
    } else if (m.match) {
      return m.match[0].timestamp;
    }
  });
  timestamps = timestamps.sort((a, b) => new Date(a) - new Date(b));
  let likes = [];
  for (let i = 0; i < timestamps.length; i += 1) {
    likes.push(i + 1);
  }
  Plotly.newPlot(
    document.getElementById("likes-graph"),
    [{ x: timestamps, y: likes }],
    {
      title: "Likes Over Time",
      paper_bgcolor: "rgb(22, 22, 22)",
      plot_bgcolor: "rgb(22, 22, 22)",
      font: { color: "white" },
    }
  );

  // Sankey Graph
  const sankeyData = {
    type: "sankey",
    orientation: "h",
    node: {
      pad: 15,
      thickness: 30,
      line: {
        color: "black",
        width: 0.2,
      },
      label: [
        "Likes",
        "Like Sent",
        "Like Received",
        "No Match",
        "Matched",
        "Met Up",
        "No Meet Up",
      ],
    },
    link: {
      source: [0, 0, 1, 1, 2, 2, 4, 4],
      target: [1, 2, 4, 3, 4, 3, 5, 6],
      value: [
        stats.likes_sent,
        stats.likes_received,
        stats.matches_from_likes_sent,
        stats.reject_from_like_sent,
        stats.matches_from_likes_received,
        stats.reject_from_like_received,
        stats.meetups,
        stats.match_no_meet,
      ],
    },
  };
  const sankeyLayout = {
    title: "Like Flow",
    paper_bgcolor: "rgb(22, 22, 22)",
    plot_bgcolor: "rgb(22, 22, 22)",
    font: {
      color: "white",
    },
  };
  Plotly.newPlot(document.getElementById("sankey"), [sankeyData], sankeyLayout);

  const arrayOfPercentagesFromValues = (arr) => {
    const total = arr.reduce((acc, current) => acc + current, 0);
    return arr.map((v) => (v / total) * 100);
  };

  const getHourFactoringTZ = (hour) => {
    let adjustedHour = hour - new Date().getTimezoneOffset() / 60;
    return adjustedHour % 24; // So we don't over or underflow into a different day and miss the index.
  };

  const timeSortedMatchesFromLikesSent = new Array(24).fill(0);
  matchData
    .filter((m) => m.match && m.like)
    .forEach((m) => {
      timeSortedMatchesFromLikesSent[
        getHourFactoringTZ(new Date(m.like[0].timestamp).getHours())
      ] += 1;
    });

  const timeData = {
    x: [
      "12am",
      "1am",
      "2am",
      "3am",
      "4am",
      "5am",
      "6am",
      "7am",
      "8am",
      "9am",
      "10am",
      "11am",
      "12pm",
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
      "8pm",
      "9pm",
      "10pm",
      "11pm",
    ],
    y: arrayOfPercentagesFromValues(timeSortedMatchesFromLikesSent),
    type: "bar",
  };

  const timeLayout = {
    title: "% of Matches from Likes Sent At Time",
    paper_bgcolor: "rgb(22, 22, 22)",
    plot_bgcolor: "rgb(22, 22, 22)",
    font: {
      color: "white",
    },
  };

  Plotly.newPlot(
    document.getElementById("time-of-day"),
    [timeData],
    timeLayout
  );
}
