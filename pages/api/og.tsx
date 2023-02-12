import { ImageResponse } from "@vercel/og";
import postsData from "@/posts.json";
import { getViews } from "@/app/get-views";

export const config = {
  runtime: "edge",
};

// fonts
const inter300 = fetch(
  new URL(
    `../../node_modules/@fontsource/inter/files/inter-latin-300-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const inter500 = fetch(
  new URL(
    `../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const inter600 = fetch(
  new URL(
    `../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

const robotoMono400 = fetch(
  new URL(
    `../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff`,
    import.meta.url
  )
).then(res => res.arrayBuffer());

export default async function OGImage() {
  const views = await getViews();
  const viewsByPostId = views.reduce((acc, view) => {
    acc[view.postId] = view.viewsFormatted;
    return acc;
  }, {});
  console.log(views);

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
        style={font("Inter 300")}
      >
        <header tw="flex text-[26px] w-full">
          <div tw="font-bold" style={font("Inter 600")}>
            Guillermo Rauch
          </div>
          <div tw="grow" />
          <div tw="text-[22px]">rauchg.com</div>
        </header>

        <main tw="flex mt-20 flex-col w-full" style={font("Roboto Mono 400")}>
          {postsData.posts.map(post => (
            <div
              key={post.id}
              tw="flex py-4 text-xl border-gray-300 border-t w-full"
            >
              <div tw="flex text-gray-400 pr-7">2021</div>
              <div tw="flex grow">{post.title}</div>
              <div tw="flex text-gray-400 pl-7">
                {viewsByPostId[post.id] ?? null}
              </div>
            </div>
          ))}
        </main>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter 300",
          data: await inter300,
        },
        {
          name: "Inter 600",
          data: await inter600,
        },
        {
          name: "Roboto Mono 400",
          data: await robotoMono400,
        },
      ],
    }
  );
}

// lil helper for mroe succinct styles
function font(fontFamily: string) {
  return { fontFamily };
}
