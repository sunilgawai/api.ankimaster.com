import { NextFunction, Request, RequestHandler, Response } from "express";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";
import { IJwtPayload } from "../typings";
import { database } from "../services/database";

const authMiddleware: RequestHandler = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer ")
		) {
			const [, tokenData] = req.headers.authorization.split(" ");
			token = tokenData;
		}
		if (!token) {
			return next(CustomErrorHandler.unAuthorized());
		}
		const { salesman_id, username } = <IJwtPayload>JwtService.verify(token);
		if (!salesman_id || !username) {
			return next(CustomErrorHandler.unAuthorized());
		}

		const salesmanData = await database.salesman.findFirst({
			where: {
				salesman_id: salesman_id,
			},
			include: {
				role: true,
				// todo: noe workingg
				// shop: true,
			},
		});
		if (!salesmanData) {
			return next(CustomErrorHandler.unAuthorized());
		}
		// const salesmanData: any = {
		//     id: salesman_id,
		//     salesman_id: salesman_id,
		//     username: username,
		// }
		if (salesmanData) {
			const { password, ...otherSalesmanData }: any = salesmanData;
			otherSalesmanData.shop = await database.tbl_shopmaster.findFirst({
				where: {
					Shop_Code: salesmanData.Shop_Code,
				},
			});
			req.salesman = otherSalesmanData;
			req.user = otherSalesmanData;
			req.isAdmin =
				salesmanData.role.slug == "admin" ||
				salesmanData.role.slug == "superadmin";
			req.isSuperAdmin = salesmanData.role.slug == "superadmin";
			req.Shop_Code = salesmanData.Shop_Code;

			if (!req.isSuperAdmin) {
				req.Shop_Code_Restriction = { Shop_Code: salesmanData.Shop_Code };
			} else {
				req.Shop_Code_Restriction = {};
			}
		}

		next();
	} catch (error) {
		return next(error);
	}
};

export default authMiddleware;
