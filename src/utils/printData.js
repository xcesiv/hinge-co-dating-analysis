export default function printData(stats) {
  const resultElement = document.getElementById("results");
  resultElement.innerText = `
	Total Likes: ${stats.total_likes}
	Likes Sent: ${stats.likes_sent} (${formatNumber(
    (stats.likes_sent / stats.total_likes) * 100
  )}% of Total Likes)
	Likes Received: ${stats.likes_received} (${formatNumber(
    (stats.likes_received / stats.total_likes) * 100
  )}% of Total Likes)
	Total Matches: ${stats.total_matches}
	Matches from Likes Sent: ${stats.matches_from_likes_sent} (${formatNumber(
    (stats.matches_from_likes_sent / stats.likes_sent) * 100
  )}% of Likes Sent => Matches)
	Matches from Likes Received: ${
    stats.matches_from_likes_received
  } (${formatNumber(
    (stats.matches_from_likes_received / stats.likes_received) * 100
  )}% of Likes Received => Matches)
	Meetups: ${stats.meetups}	(${formatNumber(
    (stats.meetups / stats.total_matches) * 100
  )}% of Matches Met)
	Average Number of Chat Messages: ${formatNumber(
    stats.average_message_number_for_match
  )}
	`;
}
