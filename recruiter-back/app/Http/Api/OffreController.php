<?php

namespace App\Http\Api;

use App\Models\Offre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class OffreController extends Controller
{
    public function index(){
        $offres = Offre::all();
        if ($offres->count() > 0){
            return response()->json(['offres' => $offres], 200);
        }else{
            return response()->json(['message' => 'No data found'], 404);
        }
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'intitulé' => 'required|string',
            'description' => 'required|string',
            'departement' => 'required|string',
            'statut_offre' => 'required|string',
            'date_butoir' => 'required|date'
        ]);

        if ($validator->fails()){
            return response()->json(['errors' => $validator->messages()], 422);
        }else{
            $offre = Offre::create([
                'intitulé' => $request->intitulé,
                'description' => $request->description,
                'departement' => $request->departement,
                'statut_offre' => $request->statut_offre,
                'date_butoir' => $request->date_butoir
            ]);

            if ($offre){
                return response()->json(['message' => 'Offre added'], 200);
            }else{
                return response()->json(['message' => 'Error sending data'], 500);
            }
        }
    }

    public function show($id){
        $offre = Offre::find($id);
        if($offre){
            return response()->json(['offre' => $offre], 200);
        }else{
            return response()->json(['message' => 'No Offre found'], 404);
        }
    }

    public function getByDepartment($departement){
        $offres = Offre::where('departement', $departement)->get();
        if($offres->count() > 0){
            return response()->json(['offres' => $offres], 200);
        }else{
            return response()->json(['message' => 'No Offre found'], 404);
        }
    }
    

    public function update(Request $request, int $id){
        $offre = Offre::find($id);
        if($offre){
            $offre->update([
                'intitulé' => $request->intitulé,
                'description' => $request->description,
                'departement' => $request->departement,
                'statut_offre' => $request->statut_offre,
                'date_butoir' => $request->date_butoir
            ]);
            return response()->json(['message' => 'Offre updated'], 200);
        }else{
            return response()->json(['message' => 'No offre found'], 404);
        }
    }

    public function destroy($id){
        $offre = Offre::find($id);
        if($offre){
            $offre->delete();
            return response()->json(['message' => 'Offre deleted'], 200);
        }else{
            return response()->json(['message' => 'No offre found'], 404);
        }
    }
}
