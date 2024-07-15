
class MulterController {
    send(req, res) {
        res.json({
            url: '/uploads/' + req.file.originalname
        })
    }
}

export default new MulterController();