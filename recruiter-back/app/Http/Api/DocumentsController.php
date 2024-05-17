<?php

namespace App\Http\Api;

use App\Models\Documents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class DocumentsController extends Controller
{
    public function index(){
        $documents = Documents::all();
        if ($documents->count() > 0){
            return response()->json(['documents' => $documents], 200);
        }else{
            return response()->json(['message' => 'No data found'], 404);
        }
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'id_candidat' => 'required|integer',
            'id_offre' => 'required|integer',
            'nom' => 'required|string|unique:candidat',
            'document' => 'required|binary|unique:candidat'
        ]);

        if ($validator->fails()){
            return response()->json(['errors' => $validator->messages()], 422);
        }else{
            $documents = Documents::create([
                'id_candidat' => $request->id_candidat,
                'id_offre' => $request->id_offre,
                'nom' => $request->nom,
                'document' => $request->document
            ]);

            if ($documents){
                return response()->json(['message' => 'Documents added'], 200);
            }else{
                return response()->json(['message' => 'Error sending data'], 500);
            }
        }
    }

    public function show($id){
        $documents = Documents::find($id);
        if($documents){
            return response()->json(['documents' => $documents], 200);
        }else{
            return response()->json(['message' => 'No documents found'], 404);
        }
    }

    public function update(Request $request, int $id){
        $documents = Documents::find($id);
        if($documents){
            $documents->update([
                'id_candidat' => $request->id_candidat,
                'id_offre' => $request->id_offre,
                'nom' => $request->nom,
                'document' => $request->document
            ]);
            return response()->json(['message' => 'Documents updated'], 200);
        }else{
            return response()->json(['message' => 'No documents found'], 404);
        }
    }

    public function destroy($id){
        $documents = Documents::find($id);
        if($documents){
            $documents->delete();
            return response()->json(['message' => 'Documents deleted'], 200);
        }else{
            return response()->json(['message' => 'No documents found'], 404);
        }
    }
}
