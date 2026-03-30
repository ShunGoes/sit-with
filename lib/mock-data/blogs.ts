export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  snippet: string;
  content: string[]; // Array of paragraphs to map easily on the UI
  readTime: string;
  category: string;
  image: string;
}

export const CATEGORIES = ["All", "Reflection", "Wellbeing", "Personal Growth"];

export const mockBlogs: BlogPost[] = [
  {
    id: "1",
    slug: "learning-to-sit-with-your-emotions",
    title: "Learning to Sit With Your Emotions",
    snippet:
      "Understanding your emotions without rushing to fix them can lead to deeper clarity and lasting growth",
    readTime: "5 mins read",
    category: "Reflection",
    image: "/images/blog-placeholder-1.webp", // Will just use a gray div if image not found
    content: [
      "In a world that constantly encourages movement, distraction, and quick solutions, sitting still with our emotions can feel unfamiliar, even uncomfortable. We are often taught to fix, suppress, or escape what we feel rather than understand it.",
      "But not every emotion needs to be solved immediately. Sometimes, what we need most is the ability to simply sit with what is present.",
      "Why We Avoid Our Emotions",
      "Many of us have learned, consciously or unconsciously, to avoid difficult emotions. Discomfort, sadness, fear, or uncertainty can feel overwhelming, so we turn to distractions, stay busy, or try to 'move on' quickly.",
      "While this may bring temporary relief, it often leaves the root of what we feel untouched. Over time, unprocessed emotion can build up, making it harder to understand ourselves clearly.",
      "What it Means to 'Sit With' Your Emotions",
      "Sitting with your emotions does not mean getting stuck in them. It means allowing yourself to notice what you feel without rushing to judge, change, or escape it.",
      "It is the quiet act of acknowledging:",
      "'This is what I am feeling right now.'",
      "'I don't have to fix it immediately.'",
      "This practice creates space between you and your reaction, helping you respond with more awareness instead of impulse.",
      "The Power of Presence",
      "When you allow yourself to stay present with your emotions, something begins to shift. You may start to understand where your feelings are coming from, what they are trying to tell you, and what you truly need.",
      "Presence brings clarity. It softens resistance. It helps you move from confusion to understanding, gently and at your own pace.",
      "Simple Ways to Practice",
      "You don't need anything complicated to begin. Start small:",
      "Pause for a moment: When you feel something strongly, take a few seconds to notice it instead of reacting immediately.",
      "Name the feeling: Try to identify what you are experiencing (sadness, frustration, anxiety, uncertainty).",
      "Stay with it briefly: Allow yourself to sit with the feeling without distraction, even if just for a minute.",
      "Be kind to yourself: Remind yourself that it is okay to feel what you feel.",
      "It's Not About Perfection",
      "Some days will feel easier than others. There will be moments when you still want to avoid or escape, and that is completely human.",
      "Sitting with your emotions is not about doing it perfectly. It is about returning to yourself, again and again, with patience and honesty."
    ],
  },
  {
    id: "2",
    slug: "why-slowing-down-matters",
    title: "Why Slowing Down Matters More Than You Think",
    snippet:
      "In a fast-paced world, creating space to pause can improve your mental clarity and overall wellbeing",
    readTime: "5 mins read",
    category: "Wellbeing",
    image: "/images/blog-placeholder-2.webp",
    content: [
      "Life moves fast. Between work, family, and digital commitments, finding a moment to pause can feel like an impossible luxury. Yet, intentionally slowing down is one of the most powerful things you can do for your mental and physical health.",
      "When we slow down, we give our nervous system a chance to reset. We step out of 'fight or flight' mode and allow our bodies to recover from the stress of constant stimulation.",
      "Practicing stillness doesn't mean doing nothing. It means doing one thing at a time, with intention and presence."
    ],
  },
  {
    id: "3",
    slug: "building-emotional-awareness",
    title: "Building Emotional Awareness Daily",
    snippet:
      "Small, consistent practices can help you become more aware of your thoughts, reactions, and patterns",
    readTime: "5 mins read",
    category: "Personal Growth",
    image: "/images/blog-placeholder-3.webp",
    content: [
      "Emotional awareness is the foundation of a balanced life. It allows us to understand our triggers, manage our responses, and build deeper connections with others.",
      "Developing this awareness takes practice. It starts with checking in with yourself regularly. Ask yourself simply: 'How am I feeling right now?'",
      "By making emotional awareness a daily habit, you build resilience and create a more authentic relationship with yourself and the world around you."
    ],
  },
];
