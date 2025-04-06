import Order from '../models/order';
import Book from '../models/book';
import { Request, Response } from 'express';




export const statistics = async (req: Request, res: Response) => {
        const totalOrders = await Order.countDocuments();
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);
        const trendingBooksCount = await Book.aggregate([
            { $match: { trending: true } },  
            { $count: "trendingBooksCount" } 
        ]);
        
        const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;

        const totalBooks = await Book.countDocuments();

        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    totalSales: { $sum: "$totalPrice" }, 
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }  
        ]);

        res.status(200).json({  totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingBooks,
            totalBooks,
            monthlySales, });
  
}