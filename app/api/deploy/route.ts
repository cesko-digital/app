/**
 * In older versions we had a `deploy` Slack slash command to redeploy the website.
 * This is now not needed, but as a courtesy to users we provide this simple feedback
 * if someone still tries to use the command.
 */
export async function POST(): Promise<Response> {
  return new Response(
    "Ruční přenasazování už není potřeba, viz tady: https://cesko-digital.slack.com/archives/CHG9NA23D/p1710836236418969",
    { status: 200 },
  );
}
