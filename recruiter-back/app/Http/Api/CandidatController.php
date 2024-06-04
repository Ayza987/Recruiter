<?php

namespace App\Http\Api;

use App\Models\Candidat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;


class CandidatController extends Controller
{
    public function index(){
        $candidats = Candidat::all();
        if ($candidats->count() > 0){

        return response()->json([
            'candidats' => $candidats


        ], 200);
    }else{
        return response()->json([
            'message' => 'No data found'


        ], 404);
    
    }

    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:candidat',
            'telephone' => 'required|string',
            'Date_de_naissance' => 'required|date',
            'Adresse' => 'required|string',

        ]);

        if ($validator->fails()){

            return response()->json([
                'errors' => $validator->messages()

            ], 422);
        }else{

            $candidat = Candidat::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'Date_de_naissance' => $request->Date_de_naissance,
                'Adresse' => $request->Adresse

            ]);

            if ($candidat){

                return response()->json([
                    'message' => 'Candidat added'
        
        
                ], 200);
            }else{
                return response()->json([
                    'message' => 'Error sending data'

                ], 500);
            
            }

        }
    }

    public function show($id){

        $candidat = Candidat::find($id);
        if($candidat){
            return response()->json([
                'candidat' => $candidat
    
    
            ], 200);

        }else{
            return response()->json([
                'message' => 'No Candidat found'
    
    
            ], 404);

        }
         

    }

    public function update(Request $request, int $id){

        $candidat = Candidat::find($id);
        if($candidat){
            $candidat->update([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'telephone' => $request->telephone

            ]);
            return response()->json([
                'message' => 'Candidat updated' ], 200);

        }else{
            return response()->json([
                'message' => 'No candidat found'
    
    
            ], 404);

        }
    }

    public function destroy($id){

        $candidat = Candidat::find($id);{
            if($candidat){
                $candidat->delete();
                return response()->json([
                    'message' => 'Candidat deleted' ], 200);
            }else{
                return response()->json([
                    'message' => 'No candidat found'
        
        
                ], 404);
            }

        }
    }
}
