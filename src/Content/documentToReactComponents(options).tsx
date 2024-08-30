import Image from "next/image";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { LinkPreview } from "@/Components/LinkPreview/LinkPreview";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, file } = node.data.target.fields;
      const { url, contentType, details } = file;

      // Check if the asset is an image or video based on the contentType
      if (contentType.startsWith("image/")) {
        // Handle image
        const { width, height } = details.image;
        return (
          <div>
            <Image
              src={`https:${url}`}
              alt={title || "Contentful Asset"}
              width={width}
              height={height}
            />
          </div>
        );
      } else if (contentType.startsWith("video/")) {
        // Handle video as iframe
        const videoUrl = `https:${url}`;
        return (
          <div className="relative pb-16/9">
            {" "}
            {/* Aspect ratio 16:9 */}
            <iframe
              src={videoUrl}
              title={title || "Contentful Video"}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
            />
          </div>
        );
      }
      return (
        <div>
          <p>Unsupported asset type</p>
        </div>
      );
    },

    [INLINES.HYPERLINK]: (node: any) => {
      const text = node.content.find(
        (item: any) => item.nodeType === "text"
      )?.value;
      return (
        <LinkPreview url={node.data.uri} className="font-bold">
          {text}
        </LinkPreview>
      );
    },
  },

  renderMark: {
    [MARKS.CODE]: (text: any) => {
      return (
        <SyntaxHighlighter
          language={
            "sql" ||
            "python" ||
            "bash" ||
            "jsx" ||
            "tsx" ||
            "typescript" ||
            "javascript" ||
            "css" ||
            "cshtml" ||
            "yaml" ||
            "docker" ||
            "scss" ||
            "nginix" ||
            "hcl" ||
            "groovy" ||
            "json"
          }
          style={vscDarkPlus}
          wrapLines
        >
          {text}
        </SyntaxHighlighter>
      );
    },
  },
};

export default renderOptions;
