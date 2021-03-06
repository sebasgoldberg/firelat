const fs = require('fs')
const PDFDocument = require('pdfkit');
const { resolve } = require('path');

async function getDiarioPDFReadableStream(req, ID){

    const YY1_BALANCE_A2P_API_CDS = await cds.connect.to('YY1_BALANCE_A2P_API_CDS')

    const tx = YY1_BALANCE_A2P_API_CDS.transaction(req)

    const results = await tx.get(`/YY1_Balance_A2P_API(P_FromPostingDate=datetime'2020-05-01T01:00:00',P_ToPostingDate=datetime'2020-05-31T01:00:00')/Results?$top=10&$skip=200&$filter=Ledger eq '0L'&$format=json`)

    const filename = `${__dirname}/../media/pdfkit.pdf`
    const image_filename = `${__dirname}/../media/image.png`
    
    const writer = fs.createWriteStream(filename)

    // Create a document
    const doc = new PDFDocument;

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(writer);

    // Embed a font, set the font size, and render some text
    doc
    .fontSize(25)
    .text('Some text with an embedded font!', 100, 100);

    // Add an image, constrain it to a given size, and center it vertically and horizontally
    doc.image(image_filename, {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
    });

    // Add another page
    doc.addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100);

    // Draw a triangle
    doc.save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill("#FF3300");

    // Apply some transforms and render an SVG path with the 'even-odd' fill rule
    doc.scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();

    // Add some text with annotations
    doc.addPage()
    .fillColor("blue")
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, {color: "#0000FF"})
    .link(100, 100, 160, 27, 'http://google.com/');

    doc.addPage()
    .fillColor("black")
    .fontSize(10)
    .text(JSON.stringify(results,null,1))

    // Finalize PDF file
    doc.end();

    // Necessario aguardar a finalização do gravado dos dados
    // ao arquivo antes de retornar 
    await new Promise( resolve => {
        writer.on('finish', () => {
            resolve()
        });    
    })

    return fs.createReadStream(filename)
}

module.exports = cds.service.impl(async function () {

    const { Diario } = this.entities

    this.on("READ", Diario, async req =>{
        const url = req._.req.path
        
        if (/\/pdf$/.test(url)) {
            const { ID } = req.data
            return [
                {
                    value: await getDiarioPDFReadableStream(req, ID)
                }
            ]
        }
    })

})
  