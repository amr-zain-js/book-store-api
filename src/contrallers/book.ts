import { Request, Response } from "express";
import Book from "../models/book";

const postABook = async (req: Request, res: Response) => {
    console.log(req.body)
    const newBook = new Book(req.body);
    const book = await newBook.save();
    res.status(201).send({message: "Book posted successfully", book})
}

const listBooks =  async (req: Request, res: Response) => {
    const filter:{ category?: string, trending?: boolean } ={}
    if(req.query.category) filter.category = req.query.category as string;
    if(req.query.trending) filter.trending = true;
    console.log(filter)
    const books = await Book.find(filter).sort({ createdAt: -1});
    res.status(200).json({books})
}

const getBook = async (req: Request, res: Response) => {
        const {id} = req.params;
        const book =  await Book.findById(id); 
        if(!book){
            res.status(404).send({message: "Book not Found!"})
        }
        res.status(200).json({book})
}

const updateBook = async (req: Request, res: Response) => {
    const {id} = req.params;
    const updatedBook =  await Book.findByIdAndUpdate(id, req.body, {new: true});
    if(!updatedBook) {
        res.status(404).send({message: "Book is not Found!"})
    }
    res.status(200).send({
        message: "Book updated successfully",
        book: updatedBook
    })
}

const deleteABook = async (req: Request, res: Response) => {
        const {id} = req.params;
        const deletedBook =  await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
};

export {
    postABook,
    listBooks,
    getBook,
    updateBook,
    deleteABook
}