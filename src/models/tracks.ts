import { Schema, Types, model, Model } from "mongoose";
import TrackInterface from "../interfaces/track.interface";
import mongooseDelete from "mongoose-delete";

interface TracksModelExt extends Model<TrackInterface> {
	findAllData(): any;
}
const TracksSchema = new Schema<any>(
	{
		name: {
			type: String,
		},
		album: {
			type: String,
		},
		cover: {
			type: String,
		},
		artist: {
			name: {
				type: String,
			},
			nickname: {
				type: String,
			},
			nationality: {
				type: String,
			},
		},
		duration: {
			start: {
				type: Number,
			},
			end: {
				type: Number,
			},
		},
		mediaId: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);
/**
 * Implementar metodo propio con relacion a storage
 * */

TracksSchema.static("findAllData", function findAllData() {
	const joinData = this.aggregate([
		//Estando en el modelo Tracks
		{
			$lookup: {
				from: "storages", //Se hace una relacion con el modelo Storages
				localField: "mediaId", //Donde en el modelo padre utilizas el campo tracks.mediId
				foreignField: "_id", //Se relacion con Storages._id
				as: "audio", //el resultado que consiga lo colca en un campo alias llamado audio
			},
		},
		{
			$unwind: "$audio",
		},
	]);
	return joinData;
});

TracksSchema.statics.findOneData = function (id) {
	const joinData = this.aggregate([
		{
			$match: {
				_id: id,
			},
		}, //Estando en el modelo Tracks
		{
			$lookup: {
				from: "storages", //Se hace una relacion con el modelo Storages
				localField: "mediaId", //Donde en el modelo padre utilizas el campo tracks.mediId
				foreignField: "_id", //Se relacion con Storages._id
				as: "audio", //el resultado que consiga lo colca en un campo alias llamado audio
			},
		},
		{
			$unwind: "$audio",
		},
	]);
	return joinData;
};

TracksSchema.plugin(mongooseDelete, { overrideMethods: "all" }); //añadiendo plugin del paquete mongoose-delete

const TrackModel = model<TrackInterface, TracksModelExt>(
	"tracks",
	TracksSchema
);

export default TrackModel;
