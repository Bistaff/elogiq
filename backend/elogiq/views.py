from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

class TokenObtainAccessOnlyView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # Get the access token from the response
        access_token = response.data.get('access')
        return Response({'token': access_token})
