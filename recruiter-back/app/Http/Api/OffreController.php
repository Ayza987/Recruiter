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

    public function publish(){
        $offres = Offre::where('statut_offre', 'Publié')->get();
        if ($offres->count() > 0){
            return response()->json(['offres' => $offres], 200);
        }else{
            return response()->json(['message' => 'No data found'], 404);
        }
    }
    
    public function toggleStatus($id)
{
    $offres = Offre::find($id);

    if ($offres) {
        $offres->statut_offre = $offres->statut_offre === 'Publié' ? 'Dépublié' : 'Publié';
        $offres->save();

        return response()->json(['message' => 'Statut de l\'offre mis à jour avec succès.', 'offre' => $offres]);
    }

    return response()->json(['message' => 'Offre non trouvée.'], 404);
}



    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'intitulé' => 'required|string',
            'description' => 'required|string',
            'departement' => 'required|string',
            'date_butoir' => 'required|date',
            'type_offre' => 'required|string',
           
        ]);

        if ($validator->fails()){
            return response()->json(['errors' => $validator->messages()], 422);
        }else{
            $offre = Offre::create([
                'intitulé' => $request->intitulé,
                'description' => $request->description,
                'departement' => $request->departement,
                'date_butoir' => $request->date_butoir,
                'type_offre' => $request->type_offre,
                
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
                'date_butoir' => $request->date_butoir,
                'type_offre' => $request->type_offre,
                
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
