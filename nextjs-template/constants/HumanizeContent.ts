export interface ContentItem {
  id: number;
  title?: string;
  description?: string | string[]; // can be string or array of paragraphs
  list?: string[];
  highlight?: string;
}

export const HumanizeContentData: ContentItem[] = [
  {
    id: 1,
    title: "Humanize AI Content",
    highlight: "AI Content",
    description:
      "Our Humanize AI tool transforms AI-generated text into natural, authentic writing that reads just like it was written by a person. As AI writing becomes more common, it’s easy to spot text that feels robotic, repetitive, or unnatural. This tool helps refine and reframe content so it flows smoothly, connects with readers, and passes as genuine human writing.",
  },
  {
    id: 2,
    title: "What Can the Humanize Tool Do?",
    highlight: "Tool Do?",
    description: "When you enter AI-generated text, our tool:",
    list: [
      "Rewrites content to make it sound natural and human.",
      "Adjusts tone (formal, informal, academic, or simple) based on your needs.",
      "Expands or shortens content while keeping meaning intact.",
      "Removes awkward word choices and stiff sentence structures.",
      "Creates text that flows smoothly, with proper rhythm and style.",
    ],
  },
  {
    id: 3,
    title: "Understanding Humanized vs. AI-Generated Text",
    highlight: "AI-Generated Text",
    description: [
      "AI-generated text is often grammatically correct but can sound repetitive, overly structured, or unnatural. Humanized content, on the other hand:",
      "By humanizing AI content, you preserve the efficiency of AI writing while gaining the authenticity of human communication."
    ],
    list: [
      "Varies sentence length and structure naturally.",
      "Uses idioms, transitional phrases, and contextual flow.",
      "Adapts to the target audience and writing purpose.",
      "Passes as human-written to both readers and AI detectors.",
    ],
  },
  {
    id: 4,
    title: "Why Use Our Humanize AI Tool?",
    highlight: "AI Tool?",
    description:
      "AI writing is efficient, but it often lacks the warmth, tone, and creativity of human expression. Whether you’re working on academic papers, blog posts, business reports, or creative writing, humanizing your content ensures:",
    list: [
      "Improved Readability – Text becomes clear, engaging, and easy to follow.",
      "Natural Tone – Removes mechanical phrasing and makes sentences flow better.",
      "Original Style – Avoids repetitive patterns that AI tools often create.",
      "Professional Presentation – Ensures your work sounds polished and credible.",
      "Stronger Connections – Helps content feel more personal and relatable to your audience.",
    ],
  },
];
