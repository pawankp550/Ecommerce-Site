const Category = require('../models/category')

exports.create = async (req, res) => {
    const category = new Category(req.body)

    try{
        const savedCategory = await category.save()
        res.status(201).send(savedCategory)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.getCategoryById = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).send()
        }
        res.send(category)
    } catch (e) {
        res.status(500).send()
    }
}

exports.updateCategory = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).send()
        }
        category.name = req.body.name
        await category.save()
        res.send(category)
    } catch (e) {
        res.status(500).send()
    }
}

exports.deleteCategory = async (req, res) => {
    try{
        const category = await Category.findOneAndDelete({ _id: req.params.id })

        if (!category) {
            return res.status(404).send()
        }

        res.status(200).send(category)
    } catch (e) {
        res.status(500).send()
    }
}
exports.getCategories = async (req, res) => {
    // console.log('in get cat')
    try {
        const categories = await Category.find({})

        if (!categories) return res.status(404).send()

        res.send(categories)
    } catch (e) {
        res.status(500).send()
    }
}