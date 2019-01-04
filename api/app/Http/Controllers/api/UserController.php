<?php

namespace App\Http\Controllers\API;

use App;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;

class UserController extends Controller
{
    /**
     * Get authenticated user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getZivis()
    {
        $usersWithLatestMission = User::all()->map(function (User $user):array {
            $userInformation = [
                'first_name' => $user->first_name,
                'id' => $user->id,
                'last_name' => $user->last_name,
                'role' => $user->user_role->name,
                'role_id' => $user->role,
                'work_experience' => $user->work_experience,
                'zdp' => $user->zdp,
            ];

            $latestMission = $user->missions->sortByDesc('start')->first();

            if ($latestMission) {
                $userInformation = array_merge($userInformation, [
                    'end' => $latestMission->end,
                    'long_mission' => $latestMission->long_mission,
                    'start' => $latestMission->start,
                ]);
            }

            return $userInformation;
        });

        return new JsonResponse($usersWithLatestMission->sortByDesc('start')->values());
    }

    public function changePassword(Request $request)
    {
        $errors = array();

        $user = Auth::user();

        $pw_old = $request->input("old_password");
        $pw_new = $request->input("new_password");
        $pw_new_2 = $request->input("new_password_2");
        $errors = [];

        if (empty($pw_old)) {
            array_push($errors, 'Altes Passwort darf nicht leer sein!');
        }

        if (!Hash::check($request->input('old_password'), $user->password)) {
            array_push($errors, 'Altes Passwort stimmt nicht!');
        }

        if ($pw_new != $pw_new_2) {
            array_push($errors, 'Die neuen Passwörter stimmen nicht überein!');
        }

        if (strlen($pw_new) < AuthController::PW_MIN_LENGTH) {
            array_push($errors, AuthController::PW_LENGTH_TEXT);
        }

        if (count($errors)>0) {
            return new JsonResponse($errors, Response::HTTP_NOT_ACCEPTABLE);
        }

        $user->password = password_hash($pw_new, PASSWORD_BCRYPT);
        $user->save();

        return new JsonResponse("Ihr Passwort wurde angepasst.");
    }

    public static function updateUser(User $user)
    {
        $user->first_name = Input::get("first_name", "");
        $user->last_name = Input::get("last_name", "");
        $user->address = Input::get("address", "");
        $user->city = Input::get("city", "");
        $user->zip = Input::get("zip", "");
        $user->hometown = Input::get("hometown", "");
        $user->birthday = Input::get("birthday", "");
        // $user->phone_mobile = Input::get("phone_mobile", "");
        // $user->phone_private = Input::get("phone_private", "");
        // $user->phone_business = Input::get("phone_business", "");
        $user->phone = Input::get("phone");
        $user->bank_iban = Input::get("bank_iban", "");
        $user->bank_bic = Input::get("bank_bic", "");
        $user->work_experience = Input::get("work_experience", "");
        // $user->driving_licence = Input::get("driving_licence", 0);
        // $user->ga_travelcard = Input::get("ga_travelcard", 0);
        // $user->half_fare_travelcard = Input::get("half_fare_travelcard", 0);
        // $user->other_fare_network = Input::get("other_fare_network", "");
        $user->driving_licence_b = Input::get("driving_licence_b", false);
        $user->driving_licence_be = Input::get("driving_licence_be", false);
        $user->chainsaw_workshop = Input::get("chainsaw_workshop", false);
        $user->regional_center = Input::get("regional_center", "");
        $user->health_insurance = Input::get("health_insurance", "");
        $user->save();
    }
}