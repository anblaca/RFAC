# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import random

# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []


class ActionDuracion(Action):

    def selOfertas(self, x):
        if x == "BlackFriday":
            return "La oferta del black friday durará todo el fin de semana."
        elif x == "FusionPlus":
            return "En la oferta del Fusion Plus es duradera y sin permanencia."
        elif x == "Pasion":
            return "La oferta de la pasion durará dos semanas solamente."
        elif x == "Verano":
            return "Esta oferta solo tiene duración del 1 de junio al 31 de agosto"
        else:
            return "No existe esa oferta"

    def name(self) -> Text:
        return "ActionDuracion"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print("Entro al run")
        x = tracker.get_slot("ofertas")
        print(x)
        if not x:
            dispatcher.utter_message(text="Selecciona una oferta.")
        else:
            dispatcher.utter_message(text = self.selOfertas(x))
        return []

class ActionPromociones(Action):

    def ofertas(self, x):
        if x == "BlackFriday":
            return "La oferta por el black friday entran 600gb de fibra óptica y un smartphone."
        elif x == "FusionPlus":
            return "En la oferta fusion plus entra el futbol con la liga y la champions."
        elif x == "Pasion":
            return "Con la tarifa pasion encontraras todo el dazn, motor y liga con la champions."
        elif x == "Verano":
            return "Esta oferta solo entra la plataforma Netflix además de 3 lineas con datos ilimitados."
        else:
            return "No existe esa oferta"

    def name(self) -> Text:
        return "ActionPromociones"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print("Entro al run")
        x = tracker.get_slot("ofertas")
        print(x)
        if not x:
            dispatcher.utter_message(text="Selecciona una oferta.")
        else:
            dispatcher.utter_message(text = self.ofertas(x))
        return []

class ActionMejora(Action):

    def ofertas(self, x):
        if x == "BlackFriday":
            return "Con esta tarifa el descuento seria de un 10%. Si le parece bien escriba CONFIRMAR, si no DENEGAR"
        elif x == "FusionPlus":
            return "En esta tarifa te proponemos que durante un año te la rebajamos un 30% y además se añaden 600gb de fibra óptica. Si le parece bien escriba CONFIRMAR, si no DENEGAR"
        elif x == "Pasion":
            return "En este caso la tarifa podemos añadir cualquier otra tarifa a la tuya por el mismo precio durante un año. Si le parece bien escriba CONFIRMAR, si no DENEGAR"
        elif x == "Verano":
            return "Podemos extender esta oferta hasta fin de año"
        else:
            return "No existe esa oferta."

    def name(self) -> Text:
        return "ActionMejora"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print("Entro al run")
        x = tracker.get_slot("ofertas")
        print(x)
        if not x:
            dispatcher.utter_message(text="Selecciona una oferta.")
        else:
            dispatcher.utter_message(text = self.ofertas(x))
        return []

class ActionFeedBack(Action):
    def ofertas(self, x):
        if x == "si":
            return "Me podría decir que oferta es la que tiene usted contratada?"
        elif x == "no":
            return "Perfecto, le doy de baja en este preciso momento de la oferta contratada."
        else:
            print(x)
            return "Puedes volver a repetirlo?"

    def name(self) -> Text:
        return "ActionFeedBack"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print("Entro al run")
        x = tracker.get_slot("ofertas")
        print(x)
        if not x:
            dispatcher.utter_message(text="Selecciona una oferta")
        else:
            dispatcher.utter_message(text = self.ofertas(x))
        return []

class ActionInteresado(Action):

    def ofertas(self, x):
        if x == "BlackFriday" or x == "FusionPlus" or x == "Pasion" or x == "Verano":
            return "Bien le puedo asignar esta oferta, para confirmarlo diga aceptar de nuevo, por favor."
        else:
            return "No existe esa oferta."

    def name(self) -> Text:
        return "ActionInteresado"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print("Entro al run")
        x = tracker.get_slot("ofertas")
        print(x)
        if not x:
            dispatcher.utter_message(text="Selecciona una oferta")
        else:
            dispatcher.utter_message(text = self.ofertas(x))
        return []

class ActionMostrarOfertas(Action):

    def ofertas(self):
        return "Actualmente disponemos de las siguientes ofertas: Para la oferta del black friday entran 600gb de fibra óptica y un smartphone\n En la oferta fusion plus entra el futbol con la liga y la champions.\n Con la tarifa pasion encontraras todo el dazn, motor y liga con la champions\n Finalmente con la oferta Verano solo entra la plataforma Netflix además de 3 lineas con datos ilimitados"

    def name(self) -> Text:
        return "ActionMostrarOfertas"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        print("Entro al run")
        x = tracker.get_slot("ofertas")
        print(x)
        dispatcher.utter_message(text = self.ofertas())
        #if not x:
        #    dispatcher.utter_message(text="Selecciona una oferta")
        #else:
        #    dispatcher.utter_message(text = self.ofertas())
        return []