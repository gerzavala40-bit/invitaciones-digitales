const markdownpdf = require("markdown-pdf");
const path = require("path");

const inputPath = "C:\\Users\\germa\\.gemini\\antigravity\\brain\\c8ad8fd2-f68f-4149-83bd-64d73835c70c\\manual_cliente.md";
const outputPath = "C:\\Users\\germa\\.gemini\\antigravity\\brain\\c8ad8fd2-f68f-4149-83bd-64d73835c70c\\manual_cliente.pdf";

markdownpdf({
  cssPath: null,
  paperFormat: "A4",
  remarkable: {
    html: true,
    breaks: true
  }
}).from(inputPath).to(outputPath, function () {
  console.log("PDF Created Successfully:", outputPath);
});
