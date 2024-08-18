<?php

namespace App\Http\Controllers;

use App\Models\MailPocket;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'subject' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        // Process the data (e.g., save to the database)
        MailPocket::create($validatedData);

        // Return the validated data as a JSON response
        return response()->json([
            'message' => 'Az űrlap sikeresen elküldve!',
            'data' => $validatedData
        ]);
    }
}
