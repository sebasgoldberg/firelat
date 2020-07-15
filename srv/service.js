const fs = require('fs')

module.exports = cds.service.impl(async function () {

    const { Diario } = this.entities

    this.on("READ", Diario, req =>{
        const url = req._.req.path
        if (/\/pdf$/.test(url)) {
            const { ID } = req.data
            const filename = `${__dirname}/dummy.pdf`
            return [
                {
                    value: fs.createReadStream(filename)
                }
            ]
        }
    })

})
  