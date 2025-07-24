import "@testing-library/jest-dom";
// Mock do Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));
// Mock do fetch global
global.fetch = jest.fn();
