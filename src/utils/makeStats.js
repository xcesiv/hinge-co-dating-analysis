export default function makeStats(matchData) {
  // Make the data globally available to play with in the console.
  window.matchData = matchData;

  const likes_sent = matchData.filter((m) => m.like).length;
  const likes_received = matchData.length - likes_sent;
  const total_likes = likes_sent + likes_received;

  const matches_from_likes_sent = matchData.filter(
    (m) => m.like && m.match
  ).length;
  const matches_from_likes_received = matchData.filter(
    (m) => !m.like && m.match
  ).length;
  const total_matches = matches_from_likes_received + matches_from_likes_sent;

  const reject_from_like_sent = likes_sent - matches_from_likes_sent;
  const reject_from_like_received =
    likes_received - matches_from_likes_received;

  // Hinge does some weird stuff with this data, it's a bit odd, but this seems to give the most accurate results
  // despite being completely illogical based on the names of the items in the JSON.
  const meetups = matchData.filter(
    (m) => m["we_met"] && m["we_met"][0]["did_meet_subject"] === false
  ).length;
  const match_no_meet =
    matches_from_likes_sent + matches_from_likes_received - meetups;

  const matched_objects = matchData.filter((m) => m.match);
  const count_messages = (match) => {
    if (match.chats) {
      return match.chats.length;
    }
    return 0;
  };
  const average_message_number_for_match =
    matched_objects.reduce((acc, current) => {
      return acc + count_messages(current);
    }, 0) / matched_objects.length;

  const stats = {
    likes_sent,
    likes_received,
    total_likes,
    matches_from_likes_sent,
    matches_from_likes_received,
    total_matches,
    reject_from_like_sent,
    reject_from_like_received,
    meetups,
    match_no_meet,
    average_message_number_for_match,
  };

  printData(stats);
  makeGraphs(stats, matchData);
  hideInput();
}
